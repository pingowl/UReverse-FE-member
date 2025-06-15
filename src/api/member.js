import axios from 'axios';

export const getMyInfo = async () => {
    const response = await axios.get('/api/v1/members/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
    });
    return response.data.response;    // { userId, name, email, phone, role }
};

export const updateMemberInfo = async (payload) => {
    return await axios.patch('/api/v1/members', payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
};

export const logout = async () => {
    const response = await axios.post('/api/v1/auth/logout');
    return response.data;
};

export const deleteMember = async (password) => {
    const response = await axios.delete('/api/v1/members', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        data: { password }
    });
    return response.data;
};
