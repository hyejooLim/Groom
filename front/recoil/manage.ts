import { atom } from 'recoil';
import { PostItem } from '../types';

export const managePostsState = atom<PostItem[]>({
  key: 'managePosts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const manageSubscribedPostsState = atom<PostItem[]>({
  key: 'manageSubscribedPosts',
  default: [],
  dangerouslyAllowMutability: true,
});
