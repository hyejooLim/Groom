import { atom } from 'recoil';

export const PAGE_SIZE = 8;
export const MANAGE_PAGE_SIZE = 5;

export const currentPageState = atom<number>({
  key: 'currentPage',
  default: 1,
});

export const firstIndexState = atom<number>({
  key: 'firstIndex',
  default: 0,
});

export const lastIndexState = atom<number>({
  key: 'lastIndex',
  default: PAGE_SIZE,
});
