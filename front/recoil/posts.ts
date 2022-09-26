import { atom } from 'recoil';
import { PostItem } from '../types';

export const mainPostsState = atom<PostItem[]>({
  key: 'mainPosts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const searchPostsState = atom<PostItem[]>({
  key: 'searchPosts',
  default: [],
  dangerouslyAllowMutability: true,
});
