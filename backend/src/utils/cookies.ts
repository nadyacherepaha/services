import type { Request, Response } from 'express';
import { env } from '../env';

const REFRESH_COOKIE_NAME = 'rt';

export function setRefreshCookie(res: Response, token: string, expires: Date) {
    res.cookie(REFRESH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
        path: '/',
    });
}

export function getRefreshCookie(req: Request): string | undefined {
    return req.cookies?.[REFRESH_COOKIE_NAME];
}

export function clearRefreshCookie(res: Response) {
    res.clearCookie(REFRESH_COOKIE_NAME, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}
