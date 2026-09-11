import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const PAGE_SIZE = 8;

interface SearchState {
  keyword: string;
  setKeyword: (keyword: string) => void;
  resetKeyword: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      keyword: '',
      setKeyword: (keyword) => set({ keyword }),
      resetKeyword: () => set({ keyword: '' }),
    }),
    { name: 'SearchStore' },
  ),
);
