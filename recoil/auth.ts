import { atom } from 'recoil';

export const isLogInState = atom<Boolean>({
  key: 'isLogIn',
  default: false,
});
