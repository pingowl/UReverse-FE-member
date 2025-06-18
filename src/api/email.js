import api from '../api/axiosInstance';

export const checkEmailDuplicate = async (email) => {
  const res = await api.get(`/auth/check-email`, {
    params: { email },
  });
  return res.data.response.available;
};

export const sendVerificationEmail = async (email) => {
  await api.post(`/auth/send-verification`, {
    email,
  });
};

export const checkEmailVerificationStatus = async (token) => {
  const res = await api.get(`/auth/verify`, {
    params: { token },
  });
  return res.data;
};
