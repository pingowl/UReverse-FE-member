import axios from 'axios';

export const checkEmailDuplicate = async (email) => {
  const res = await axios.get(`/api/v1/auth/check-email`, {
    params: { email },
  });
  return res.data.response.available;
};

export const sendVerificationEmail = async (email, redirectUrl) => {
  await axios.post(`/api/v1/auth/send-verification`, {
    email,
    redirectUrl,
  });
};

export const checkEmailVerificationStatus = async (email) => {
  const res = await axios.get(`/api/v1/auth/verify-status`, {
    params: { email },
  });
  return res.data;
};
