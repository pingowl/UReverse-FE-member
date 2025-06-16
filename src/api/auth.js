import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post(
    'http://localhost:8080/api/v1/auth/login',
    { email, password },
    {
      withCredentials: true, // 쿠키에 refreshToken 저장 위해 필요
    }
  );
  return response.data.response; // { accessToken, role }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/auth/sign-up',
      data
    );
    return response.data; // success: true일 때 전체 응답 반환
  } catch (error) {
    // 백엔드에서 내려주는 구조를 추출
    const fallbackError = {
      success: false,
      response: null,
      error: {
        message: '알 수 없는 오류가 발생했습니다.',
        status: error.response?.status || 500,
      },
    };

    // 백엔드 에러 형식과 일치하면 그대로 반환
    if (error.response?.data?.error) {
      return {
        success: false,
        response: null,
        error: {
          message: error.response.data.error.message,
          status: error.response.data.error.status,
        },
      };
    }

    return fallbackError;
  }
};


export const recoverPassword = async (email) => {
  const res = await axios.post('/api/v1/auth/recovery/password', { email });
  return res.data.response;
};