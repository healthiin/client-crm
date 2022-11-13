import type { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.be-healthy.life',
  validateStatus: status => status !== 401,
});

const onFulfilled = (response: AxiosResponse) => response;

const onRejected = async (
  error: AxiosError & { config: { retryCount: number } },
) => {
  const retryCount = error.config.retryCount || 1;
  if (retryCount >= 3) return Promise.reject(error);

  const { status, data } = await axiosInstance.request({
    method: 'PATCH',
    url: '/auth/refresh',
  });

  if (status === 401) return Promise.reject(error);

  localStorage.setItem('access_token', data.access_token);

  error.config.retryCount = retryCount + 1;
  return axiosInstance.request(error.config);
};

axiosInstance.interceptors.request.use(request => {
  return {
    ...request,
    timeout: 2000,
    headers: {
      ...request.headers,
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  };
});

axiosInstance.interceptors.response.use(onFulfilled, onRejected);
