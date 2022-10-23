import { atom } from 'recoil';
import { UserType } from '../types';

export const userState = atom<UserType>({
  key: 'user',
  default: null,
});
