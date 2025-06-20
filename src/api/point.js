import api from './axiosInstance';

export const fetchPointHistory = async (cursor) => {
  const params = cursor?.lastCreatedAt
    ? {
        lastCreatedAt: cursor.lastCreatedAt,
        lastProductId: cursor.lastProductId,
      }
    : {};

  const response = await api.get('/members/points', { params });
  return response.data.response;
};
