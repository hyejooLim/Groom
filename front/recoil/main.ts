import { atom } from 'recoil';
import { persistAtomEffect } from './persist';

export const PAGE_SIZE = 8;

export const firstIndexState = atom<number>({
  key: 'main_firstIndex',
  default: 0,
  effects_UNSTABLE: [persistAtomEffect],
});

export const lastIndexState = atom<number>({
  key: 'main_lastIndex',
  default: PAGE_SIZE,
  effects_UNSTABLE: [persistAtomEffect],
});

export const currentPageState = atom<number>({
  key: 'main_currentPage',
  default: 1,
  effects_UNSTABLE: [persistAtomEffect],
});
