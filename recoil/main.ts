import { atom } from 'recoil';

export const PAGE_SIZE = 8;

export const keywordState = atom<string>({
  key: 'keyword',
  default: '',
});
