import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/User';
import { LoginRequestBody, RefreshTokenRequestBody, RegisterRequestBody, Tokens, User } from '../types';

dotenv.config();

const router = express.Router();

type TypedRequestBody<T> = Request<{}, {}, T>;

const generateTokens = (user: User): Tokens => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'access_secret',
        { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

router.post('/register', async (req: TypedRequestBody<RegisterRequestBody>, res: Response): Promise<void> => {
    try {
        const { email, name, phone, password } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, name, phone, role: 'user', password: hashedPassword });
        await newUser.save();
        const userObject = newUser.toObject() as unknown as User;
        const tokens = generateTokens(userObject);

        res.status(201).json({ user: newUser, tokens });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
        return;
    }
});

router.post('/login', async (req: TypedRequestBody<LoginRequestBody>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }) as User;

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const tokens = generateTokens(user);

        res.status(200).json({ user, tokens });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
        return;
    }
});

router.post('/refresh-token', (req: TypedRequestBody<RefreshTokenRequestBody>, res: Response): Promise<void> | undefined => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(401).json({ error: 'Refresh Token is required' });
            return;
        }

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET || 'refresh_secret',
            (err, decoded: any) => {
                if (err) {
                    res.status(403).json({ error: 'Invalid Refresh Token' });
                    return;
                }

                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.JWT_SECRET || 'access_secret',
                    { expiresIn: '24h' }
                );

                res.status(200).json({ accessToken });
                return;
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
        return;
    }
});

export default router;
