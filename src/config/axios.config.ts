import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: import.meta.env.CAP1_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = config;

    const token = localStorage.getItem('auth_token');

    if (token) {
      newConfig.headers.Authorization = `Token ${token}`;
    }

    if (newConfig.data) {
      newConfig.data = JSON.stringify(config.data);
    }

    return newConfig;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('HTTP-REQUEST-ERROR:', error);
    Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.data?.accessToken) {
      localStorage.setItem('auth_token', response.data?.data?.accessToken);
    }

    if (response?.data.status === 401) {
      localStorage.setItem('auth_token', '');
    }

    return response;
    // if (response && response.data) {

    // }

    // return newResponse.data;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('HTTP-RESPONSE-ERROR:', error);
    Promise.reject(error);
  },
);

export default http;
