import api from './axiosInstance';

/**
 * @param
 * @returns
 */
export async function uploadProduct(productData) {
  const response = await api.post('/members/product', productData);

  return response.data.response;
}
