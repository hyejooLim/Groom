import { atom } from 'recoil';
import { PostItem } from '../types';

export const managePostsState = atom<PostItem[]>({
  key: 'managePosts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const manageTitleState = atom<string>({
  key: 'manageTitle',
  default: '',
  dangerouslyAllowMutability: true,
});

export const isSearchState = atom<boolean>({
  key: 'isSearch',
  default: false,
  dangerouslyAllowMutability: true,
});
