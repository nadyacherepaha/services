import { AuthSuccess, ErrorPayload, RH, Tokens } from 'src/types';
import * as Auth from '../services/auth.service';
import { getRefreshCookie, sendResetEmail } from '../utils';

export const register: RH<{}, AuthSuccess | ErrorPayload> = async (req, res) => {
    const { email, name, phone, password, socials } = req.body;
    const result = await Auth.register(res, { email, name, phone, password, socials });
    if ('error' in result) {
        res.status(400).json(result);
        return;
    }
    res.status(201).json(result);
};

export const login: RH<{}, AuthSuccess | ErrorPayload> = async (req, res) => {
    const { email, password } = req.body;
    const result = await Auth.login(res, { email, password });
    if ('error' in result) {
        res.status(400).json(result);
        return;
    }
    res.status(200).json(result);
};

export const refresh: RH<{}, Tokens | ErrorPayload> = async (req, res) => {
    const rt = getRefreshCookie(req);
    const result = await Auth.refresh(res, rt);
    if ('error' in result) {
        res.status(401).json(result);
        return;
    }
    res.status(200).json(result);
};

export const logout: RH<{}, { ok: true }> = async (req, res) => {
    const rt = getRefreshCookie(req);
    const result = await Auth.logout(res, rt);
    res.status(200).json(result);
};

export const forgot: RH<{}, { ok: true } | { error: string }> = async (req, res) => {
    const { email } = req.body;

    const appUrl = process.env.APP_URL ?? 'http://localhost:5173';
    const result = await Auth.issueResetToken(email, async (token) => {
        const link = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;
        await sendResetEmail(email, link);
    });

    if ('error' in result) {
        res.status(200).json({ ok: true });
        return;
    }
    res.status(200).json(result);
};

export const reset: RH<{}, { ok: true } | { error: string }> = async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        res.status(400).json({ error: 'Bad request' });
        return;
    }

    const result = await Auth.resetPassword(res, token, password);
    if ('error' in result) {
        res.status(400).json(result);
        return;
    }
    res.status(200).json(result);
};
