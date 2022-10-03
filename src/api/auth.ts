import { axiosInstance } from '@/api/instance';

const getAccessToken = async () => {
  return axiosInstance.patch('/auth/refresh');
};

export default {
  getAccessToken,
};
