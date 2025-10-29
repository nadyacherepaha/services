import { getRefreshToken } from '@shared/api';
import { clearAccess, getAccess, setAccess } from '@shared/lib/storage';
import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_API_URL;

export const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
});

export const axiosRefresh = Axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

declare module 'axios' {
    interface AxiosRequestConfig<D = any> {
        _retry?: boolean;
    }

    interface InternalAxiosRequestConfig<D = any> {
        _retry?: boolean;
    }
}

axios.interceptors.request.use(
    (config) => {
        const at = getAccess();
        if (at) config.headers.Authorization = `Bearer ${at}`;

        return config;
    },
    (error) => Promise.reject(error?.response?.data || error?.response || error),
);

let isRefreshing = false;
let queue: Array<() => void> = [];

axios.interceptors.response.use(
    (response) => response.data ?? response,
    async (error: AxiosError<any>) => {
        const resp = error.response;
        const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (!resp) return Promise.reject(error);

        if (original?._retry) {
            return Promise.reject(resp.data ?? resp);
        }

        if ((resp?.status === 401 || resp?.status === 403)) {
            original._retry = true;

            if (isRefreshing) {
                await new Promise<void>((resolve) => {
                    queue.push(() => resolve());
                });
                const at = getAccess();
                if (at) (original.headers as any).Authorization = `Bearer ${at}`;
                return axios.request(original as AxiosRequestConfig);
            }

            isRefreshing = true;

            try {
                const r = await getRefreshToken();
                const accessToken = (r.data?.accessToken ?? r.data) as string | undefined;
                if (!accessToken) throw new Error('No accessToken from refresh');

                setAccess(accessToken);

                queue.forEach((fn) => fn());
                queue = [];

                (original.headers as any).Authorization = `Bearer ${accessToken}`;
                return axios.request(original as AxiosRequestConfig);
            } catch (e) {
                clearAccess();
                queue = [];
                window.location.href = '/login';
                return Promise.reject(resp.data ?? resp);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(resp.data ?? resp);
    },
);
