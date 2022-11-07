import { atom } from 'recoil';
import { persistAtomEffect } from './persist';

export const PAGE_SIZE = 8;
export const MANAGE_PAGE_SIZE = 5;

export const firstIndexState = atom<number>({
  key: 'firstIndex',
  default: 0,
  effects_UNSTABLE: [persistAtomEffect],
});

export const lastIndexState = atom<number>({
  key: 'lastIndex',
  default: PAGE_SIZE,
  effects_UNSTABLE: [persistAtomEffect],
});

export const currentPageState = atom<number>({
  key: 'currentPage',
  default: 1,
  effects_UNSTABLE: [persistAtomEffect],
});
