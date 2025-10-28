export type Role = 'user' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    socials: string[];
    role: Role;
    password: string;
    refreshTokenHash?: string;
    refreshTokenExp?: Date;
    resetTokenHash?: string;
    resetTokenExp?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type SafeUser = Omit<User, 'password' | 'refreshTokenHash' | 'resetTokenHash'>;
