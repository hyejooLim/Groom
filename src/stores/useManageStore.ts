import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { CategoryJson, PostItem, SharedPost } from '@/@types/types';

export const MANAGE_PAGE_SIZE = 5;

interface ManageState {
  managePosts: PostItem[];
  manageSubscribedPosts: PostItem[];
  manageSharedPosts: SharedPost[];
  categoryJson: CategoryJson;

  firstIndex: number;
  lastIndex: number;
  currentPage: number;

  setManagePosts: (posts: PostItem[]) => void;
  setManageSubscribedPosts: (posts: PostItem[]) => void;
  setManageSharedPosts: (posts: SharedPost[]) => void;
  setCategoryJson: (nextState: CategoryJson | ((prevState: CategoryJson) => CategoryJson)) => void;
  setFirstIndex: (index: number) => void;
  setLastIndex: (index: number) => void;
  setCurrentPage: (page: number) => void;
}

export const useManageStore = create<ManageState>()(
  devtools(
    persist(
      (set) => ({
        managePosts: [],
        manageSubscribedPosts: [],
        manageSharedPosts: [],
        categoryJson: { append: [], update: [], delete: [] },

        firstIndex: 0,
        lastIndex: MANAGE_PAGE_SIZE,
        currentPage: 1,

        setManagePosts: (managePosts) => set({ managePosts }),
        setManageSubscribedPosts: (manageSubscribedPosts) => set({ manageSubscribedPosts }),
        setManageSharedPosts: (manageSharedPosts) => set({ manageSharedPosts }),
        setCategoryJson: (nextState) =>
          set((state) => ({
            categoryJson: typeof nextState === 'function' ? nextState(state.categoryJson) : nextState,
          })),
        setFirstIndex: (firstIndex) => set({ firstIndex }),
        setLastIndex: (lastIndex) => set({ lastIndex }),
        setCurrentPage: (currentPage) => set({ currentPage }),

        resetPagination: () =>
          set({
            firstIndex: 0,
            lastIndex: MANAGE_PAGE_SIZE,
            currentPage: 1,
          }),
      }),
      {
        name: 'manage-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          firstIndex: state.firstIndex,
          lastIndex: state.lastIndex,
          currentPage: state.currentPage,
        }),
      },
    ),
  ),
);
