import api from './axiosInstance';

/**
 * @param 
 * @returns 
 */
export async function uploadProduct(productData) {
    const response = await api.post('/api/v1/members/product', productData);

    return response.data.response;
}