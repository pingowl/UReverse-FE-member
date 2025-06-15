import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        userId: null,
        email: '',
        name: '',
        phone: '',
        role: '',
        isLoggedIn: false,
        productStatus: {
            '상품 등록': 0,
            '1차 검수': 0,
            '2차 검수': 0,
            '배송 요청 등록': 0,
            '배송 중': 0,
            '배송 완료': 0,
        },
    },
});
