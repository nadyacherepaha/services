import { axios } from '@shared/api';

export const signUp = ({ email, name, password, phone }: RegisterParams): Promise<RegisterResponse> => {
    return axios.post('api/auth/register', { email, name, password, phone });
};

export const signIn = ({ email, password }: LoginParams): Promise<LoginResponse> => {
    return axios.post('api/auth/login', { email, password });
};

export const getRefreshToken = (refreshToken: string) => {
    return axios.post('api/auth/refresh-token', { refreshToken });
};
