import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export const generateAccessToken = (payload: object, exp = '15m') =>
    jwt.sign(payload, env.JWT_SECRET!, { expiresIn: exp });
export const verifyAccessToken = (token: string) => jwt.verify(token, env.JWT_SECRET!);

export const randomToken = (size = 32) => crypto.randomBytes(size).toString('hex');
export const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

export const hash = async (s: string) => bcrypt.hash(s, 10);
export const compare = async (s: string, h: string) => bcrypt.compare(s, h);
