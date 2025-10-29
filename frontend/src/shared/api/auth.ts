import { axios, axiosRefresh } from '@shared/api';

export const signUp = ({ email, name, password, phone }: RegisterParams): Promise<RegisterResponse> => {
    return axios.post('api/auth/register', { email, name, password, phone });
};

export const signIn = ({ email, password }: LoginParams): Promise<LoginResponse> => {
    return axios.post('api/auth/login', { email, password });
};

export const getRefreshToken = () => {
    return axiosRefresh.post('/api/auth/refresh-token');
};

export const signOut = () => {
    return axios.post('/api/auth/logout');
};

export const forgotPassword = (email: string) => {
    return axios.post('/api/auth/forgot-password', { email });
};

export const resetPassword = (params: { token: string; password: string }) => {
    return axios.post('/api/auth/reset-password', params);
};
