import api from './axiosInstance';

export const getMyInfo = async () => {
    const response = await api.get('/api/v1/members/me');
    return response.data.response;    // { userId, name, email, phone, role }
};

export const updateMemberInfo = async (payload) => {
    const response = await api.patch('/api/v1/members', payload);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/api/v1/auth/logout');
    return response.data;
};

export const deleteMember = async (password) => {
    const response = await api.delete('/api/v1/members', {
        data: { password }
    });
    return response.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
    const response = await api.patch('/api/v1/members/password', {
        currentPassword,
        newPassword,
    });
    return response.data;
};
