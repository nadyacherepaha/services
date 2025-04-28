import Axios from 'axios';
import { getRefreshToken } from './auth';

const API_URL = process.env.REACT_API_URL;
const LOCAL_TOKEN = 'token';

export const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error?.response?.data || error?.response || error),
);

axios.interceptors.response.use(
    (response) => {
        return response.data ?? response;
    },
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            const tokens = localStorage.getItem(LOCAL_TOKEN);
            const refreshToken = JSON.parse(tokens).refreshToken;
            try {
                const refreshed = await getRefreshToken(refreshToken);
                if (refreshed) {
                    originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
                    return axios(originalRequest);
                } else {
                    window.location.href = '/login';
                }
            } catch (err) {
                console.error('Token refresh failed:', err);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error?.response?.data || error?.response || error);
    },
);
