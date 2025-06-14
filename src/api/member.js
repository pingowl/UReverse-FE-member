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
