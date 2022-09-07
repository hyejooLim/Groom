import { atom, selector } from 'recoil';

import { UserType } from '../types';
import getUser from '../apis/user/getUser';

export const userState = atom<UserType>({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const userSelector = selector({
  key: 'userSelector',
  get: async () => {
    try {
      const response = await getUser();
      return response;
    } catch (err) {
      console.error(err);
    }
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});
