import api from './axiosInstance';

export const getMyInfo = async () => {
  const response = await api.get('/members/me');
  return response.data.response; // { userId, name, email, phone, role }
};

export const updateMemberInfo = async (payload) => {
  const response = await api.patch('/members', payload);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const deleteMember = async (password) => {
  const response = await api.delete('/members', {
    data: { password },
  });
  return response.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.patch('/members/password', {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const getNotifications = async () => {
  try {
    const response = await api.get('/members/notifications');
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateNotifications = async (notificationIdList) => {
  try {
    const response = await api.put(
      '/members/readNotification',
      notificationIdList
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
