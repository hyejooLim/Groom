import { atom } from 'recoil';
import { PostItem } from '@/@types/types';

export const mainPostsState = atom<PostItem[]>({
  key: 'mainPosts',
  default: [],
  dangerouslyAllowMutability: true,
});
