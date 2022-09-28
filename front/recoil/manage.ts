import { atom } from 'recoil';
import { PostItem } from '../types';

export const managePostsState = atom<PostItem[]>({
  key: 'managePosts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const managePostsTitleState = atom<string>({
  key: 'managePostsTitle',
  default: '',
  dangerouslyAllowMutability: true,
});

export const isSearchManagePostsState = atom<boolean>({
  key: 'isSearchManagePosts',
  default: false,
  dangerouslyAllowMutability: true,
});

export const manageSubscribedPostsState = atom<PostItem[]>({
  key: 'manageSubscribedPosts',
  default: [],
  dangerouslyAllowMutability: true,
});

export const manageSubscribedPostsTitleState = atom<string>({
  key: 'manageSubscribedPostsTitle',
  default: '',
  dangerouslyAllowMutability: true,
});

export const isSearchManageSubscribedPostsState = atom<boolean>({
  key: 'isSearchManageSubscribedPosts',
  default: false,
  dangerouslyAllowMutability: true,
});
