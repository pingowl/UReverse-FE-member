import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(); // 기본 localStorage 사용

export const authState = atom({
    key: 'authState',
    default: {
        accessToken: null,
        role: null,
    },
    effects_UNSTABLE: [persistAtom], // Recoil 상태와 recoil 간 데이터 자동 저장/복원 연결
});
