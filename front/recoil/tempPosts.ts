import { atom, selector } from 'recoil';

import getTempPosts from '../apis/tempPosts/getTempPosts';
import { TempPostItem } from '../types';

export const tempPostsState = atom<TempPostItem[]>({
  key: 'tempPostsState',
  default: [],
  dangerouslyAllowMutability: true,
});

export const tempPostsCountState = atom<number>({
  key: 'tempPostsCountState',
  default: 0,
  dangerouslyAllowMutability: true,
});

export const getTempPostsSelector = selector({
  key: 'getTempPostsSelector',
  get: async ({ get }) => {
    try {
      const data = await getTempPosts();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  set: ({ set }, newValue) => {
    set(tempPostsState, newValue);
  },
});
