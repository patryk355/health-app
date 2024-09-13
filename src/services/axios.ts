import axios, {AxiosError} from 'axios';
import {useUserStore} from '../store/userStore.ts';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getErrorText = (error: AxiosError) => {
  return error?.response?.data ?? '';
};

export default instance;
