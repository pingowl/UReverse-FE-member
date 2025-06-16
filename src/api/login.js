import api from './axiosInstance';

/**
 * 로그인 요청
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{ accessToken: string, role: string }>}
 */
export async function login(email, password) {
    const response = await api.post('/api/v1/auth/login', {
        email,
        password,
    });

    // 로그인 성공 시 서버 응답 구조 기준에 맞게 데이터 추출
    const { accessToken, role } = response.data.response;
    return { accessToken, role };
}