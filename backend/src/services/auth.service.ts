import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { toSafeUser, UserModel } from '../models/User';
import type { AuthSuccess, ErrorPayload, Tokens } from '../types';
import { User } from '../types';
import {
    ACCESS_LIFETIME,
    clearRefreshCookie,
    randomToken,
    REFRESH_LIFETIME_MS,
    RESET_LIFETIME_MS,
    setRefreshCookie,
    sha256
} from '../utils';

const JWT_SECRET = process.env.JWT_SECRET ?? 'access_secret';

async function issueSession(res: Response, userId: string): Promise<string> {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: ACCESS_LIFETIME ?? '24h' });
    const refreshPlain = randomToken(64);
    const refreshHash = sha256(refreshPlain);
    const refreshExp = new Date(Date.now() + REFRESH_LIFETIME_MS);

    await UserModel.updateOne(
        { _id: userId },
        { $set: { refreshTokenHash: refreshHash, refreshTokenExp: refreshExp } },
        { upsert: false }
    ).exec();

    setRefreshCookie(res, refreshPlain, refreshExp);
    return accessToken;
}

export async function register(
    res: Response,
    params: { email: string; name: string; phone: string; password: string; socials?: string[] }
): Promise<AuthSuccess | ErrorPayload> {
    const { email, name, phone, password, socials = [] } = params;

    const exists = await UserModel.findOne({ email }).exec();
    if (exists) return { error: 'User already exists' };

    const hash = await bcrypt.hash(password, 10);
    const created = await UserModel.create({
        email, name, phone, socials, role: 'user', password: hash,
    });

    const accessToken = await issueSession(res, created._id.toString());
    const safeUser = toSafeUser(created);
    return { user: safeUser, tokens: { accessToken } as Tokens };
}

export async function login(
    res: Response,
    params: { email: string; password: string }
): Promise<AuthSuccess | ErrorPayload> {
    const { email, password } = params;

    const user = await UserModel.findOne({ email }).exec();
    if (!user) return { error: 'User not found' };

    const ok = await bcrypt.compare(password, user.get('password'));
    if (!ok) return { error: 'Invalid credentials' };

    const accessToken = await issueSession(res, user._id.toString());
    const safeUser = toSafeUser(user);
    return { user: safeUser, tokens: { accessToken } as Tokens };
}

export async function refresh(res: Response, refreshPlain?: string): Promise<Tokens | ErrorPayload> {
    if (!refreshPlain) return { error: 'No refresh token' };

    const hash = sha256(refreshPlain);
    const user = await UserModel.findOne({ refreshTokenHash: hash }).exec() as HydratedDocument<User>;

    if (!user || !user.refreshTokenExp || +user.refreshTokenExp < Date.now()) {
        clearRefreshCookie(res);
        return { error: 'Refresh expired' };
    }

    const accessToken = await issueSession(res, user._id.toString());
    return { accessToken };
}

export async function logout(res: Response, refreshPlain?: string): Promise<{ ok: true }> {
    if (refreshPlain) {
        const hash = sha256(refreshPlain);
        await UserModel.updateOne(
            { refreshTokenHash: hash },
            { $unset: { refreshTokenHash: 1, refreshTokenExp: 1 } }
        ).exec();
    }

    clearRefreshCookie(res);
    return { ok: true };
}

export async function issueResetToken(email: string, makeLink: (token: string) => Promise<void> | void):
    Promise<{ ok: true } | ErrorPayload> {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return { ok: true };

    const tokenPlain = randomToken(48);
    user.set({
        resetTokenHash: sha256(tokenPlain),
        resetTokenExp: new Date(Date.now() + RESET_LIFETIME_MS),
    });
    await user.save();

    await makeLink(tokenPlain);
    return { ok: true };
}

export async function resetPassword(
    res: Response,
    tokenPlain: string,
    newPassword: string
): Promise<{ ok: true } | ErrorPayload> {
    const user = await UserModel.findOne({ resetTokenHash: sha256(tokenPlain) }).exec() as HydratedDocument<User>;
    if (!user || !user.resetTokenExp || +user.resetTokenExp < Date.now()) {
        return { error: 'Invalid or expired token' };
    }

    user.set({
        password: await bcrypt.hash(newPassword, 10),
        resetTokenHash: undefined,
        resetTokenExp: undefined,
        refreshTokenHash: undefined,
        refreshTokenExp: undefined,
    });
    await user.save();

    clearRefreshCookie(res);
    return { ok: true };
}
