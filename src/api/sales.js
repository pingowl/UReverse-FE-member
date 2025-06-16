import api from './axiosInstance';

export const fetchSalesHistory = async (cursor) => {
    const response = await api.get('/api/v1/members/sales', {
        params: cursor?.lastCreatedAt ? cursor : {},
    });
    return response.data.response;
};