import api from './axiosInstance';

/**
 * 브랜드 목록 요청
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{ accessToken: string, role: string }>}
 */
export async function getBrandList() {
    const response = await api.get('/api/v1/common/allBrands');

    const brandList = response.data.response;
    return brandList;
}