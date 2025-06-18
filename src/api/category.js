import api from './axiosInstance';

/**
 * 카테고리 목록 요청
 * @param {number} brandId
 * @returns
 */
export async function getCategoryList(brandId) {
  const response = await api.get(`/common/brands/${brandId}/categories`);

  const categoryList = response.data.response;
  return categoryList;
}
