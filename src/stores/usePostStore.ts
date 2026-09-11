import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PostItem } from '@/@types/types';

interface PostState {
  mainPosts: PostItem[];

  setMainPosts: (mainPosts: PostItem[]) => void;
  resetMainPosts: () => void;
}

export const usePostStore = create<PostState>()(
  devtools(
    (set) => ({
      mainPosts: [],

      setMainPosts: (mainPosts) => set({ mainPosts }),
      resetMainPosts: () => set({ mainPosts: [] }),
    }),
    { name: 'PostStore' },
  ),
);
