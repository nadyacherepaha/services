export type Role = 'user' | 'admin';


export interface User {
    _id: string;
    email: string;
    name: string;
    phone: string;
    socials: string[];
    role: Role;
    password: string;
}

export type RegisterRequestBody = {
    email: string;
    name: string;
    phone: string;
    socials: string[];
    password: string;
};

export type LoginRequestBody = {
    email: string;
    password: string;
};

export type RefreshTokenRequestBody = {
    refreshToken: string;
};

export type Tokens = {
    accessToken: string;
    refreshToken: string;
}

