import { atom } from 'recoil';
import { PostItem } from '../types';
import { persistAtomEffect } from './persist';

export const MANAGE_PAGE_SIZE = 5;

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

export const firstIndexState = atom<number>({
  key: 'manage_firstIndex',
  default: 0,
  effects_UNSTABLE: [persistAtomEffect],
});

export const lastIndexState = atom<number>({
  key: 'manage_lastIndex',
  default: MANAGE_PAGE_SIZE,
  effects_UNSTABLE: [persistAtomEffect],
});

export const currentPageState = atom<number>({
  key: 'manage_currentPage',
  default: 1,
  effects_UNSTABLE: [persistAtomEffect],
});
