import { ACCESS_KEY, USER_KEY } from '@shared/config/auth';
import { StoredUser } from './types';

export const getAccess = () => localStorage.getItem(ACCESS_KEY) ?? '';
export const setAccess = (token: string) => localStorage.setItem(ACCESS_KEY, token);
export const clearAccess = () => localStorage.removeItem(ACCESS_KEY);

export const getUser = (): StoredUser | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
};

export const setUser = (u: StoredUser) => localStorage.setItem(USER_KEY, JSON.stringify(u));
export const clearUser = () => localStorage.removeItem(USER_KEY);
