import api from './axiosInstance';

export const fetchSalesHistory = async (cursor) => {
    const params = cursor?.lastCreatedAt
        ? {
            lastCreatedAt: cursor.lastCreatedAt,
            lastProductId: cursor.lastProductId,
        }
        : {};

    const response = await api.get('/api/v1/members/sales', { params });
    return response.data.response;
};