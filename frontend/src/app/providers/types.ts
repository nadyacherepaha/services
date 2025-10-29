import { ReactNode } from 'react';

export interface AppProvidersProps {
    children: ReactNode;
}

export type User = { id: string; name: string; email: string };

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (data: LoginParams) => Promise<void>;
    register: (data: RegisterParams) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
};
