import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post(
        'http://localhost:8080/api/v1/auth/login',
        { email, password },
        {
            withCredentials: true,    // 쿠키에 refreshToken 저장 위해 필요
        }
    );
    return response.data.response;    // { accessToken, role }
};
