import { AuthContextType, User } from '@app/providers';
import { signIn, signOut, signUp } from '@shared/api';
import { clearAccess, clearUser, getUser, setAccess, setUser } from '@shared/lib/storage';
import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(() => getUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setUserPersist = (u: User | null) => {
        setUserState(u);
        if (u) setUser(u);
        else clearUser();
    };

    const pickResponse = (resp: any) => {
        const u = resp.user as User;
        const accessToken = resp.accessToken ?? resp.tokens?.accessToken;
        return { u, accessToken };
    };

    const login = async ({ email, password }: LoginParams) => {
        setLoading(true);
        setError(null);
        try {
            const resp = await signIn({ email, password });
            const { u, accessToken } = pickResponse(resp);
            if (!accessToken || !u) throw new Error('Bad login response');
            setAccess(accessToken);
            setUserPersist(u);
        } catch (e: any) {
            clearAccess();
            setUserPersist(null);
            setError(e?.error || e?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, name, password, phone, socials }: RegisterParams) => {
        setLoading(true);
        setError(null);
        try {
            const resp = await signUp({ email, name, password, phone, socials });
            const { u, accessToken } = pickResponse(resp);
            if (!accessToken || !u) throw new Error('Bad register response');
            setAccess(accessToken);
            setUserPersist(u);
        } catch (e: any) {
            clearAccess();
            setUserPersist(null);
            setError(e?.error || e?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut();
        } catch {
        } finally {
            clearAccess();
            setUserPersist(null);
        }
    };

    const clearError = () => setError(null);

    useEffect(() => {
        if (user) {
            console.log('AuthContext user changed:', user);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};
