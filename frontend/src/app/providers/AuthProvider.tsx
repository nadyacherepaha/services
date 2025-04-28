import { signIn, signUp } from '@shared/api';
import React, { createContext, ReactNode, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (data: LoginParams) => Promise<void>;
    register: (data: RegisterParams) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ email, password }: LoginParams) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signIn({ email, password });
            const { user, tokens } = response;
            localStorage.setItem('tokens', JSON.stringify(tokens));
            setUser(user as User);
        } catch (err: any) {
            setUser(null);
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ email, name, password, phone }: RegisterParams) => {
        setLoading(true);
        setError(null);
        try {
            const response = await signUp({ email, name, password, phone });
            const { user, tokens } = response;
            localStorage.setItem('tokens', JSON.stringify(tokens));
            setUser(user as User);
        } catch (err: any) {
            setUser(null);
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('tokens');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
