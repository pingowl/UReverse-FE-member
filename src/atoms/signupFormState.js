import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const signupFormState = atom({
  key: 'signupFormState',
  default: {
    name: '',
    email: '',
    password: '',
    phone: '',
  },
  effects_UNSTABLE: [persistAtom],
});
