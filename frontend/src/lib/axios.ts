import Axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(
    (config) => {
        const rawToken = localStorage.getItem('token');
        const parsedToken = rawToken && JSON.parse(rawToken);
        const accessToken = parsedToken?.accessToken || '';

        config.headers.Accept = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';

        if (accessToken) {
            config.headers['X-AUTH-TOKEN'] = accessToken;
        }

        return config;
    },
    (error) => Promise.reject(error?.response?.data || error?.response || error),
);

axios.interceptors.response.use(
    (response) => {
        return response.data ?? response;
    },
    async (error) => Promise.reject(error?.response?.data || error?.response || error),
);
