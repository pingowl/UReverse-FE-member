import api from './axiosInstance';

export const fetchPointHistory = async () => {
  const response = await api.get('/api/v1/members/points');
  return response.data.response;
};
