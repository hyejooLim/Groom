import { atom } from 'recoil';
import { CategoryItem } from '../types';

export const categoriesState = atom<CategoryItem[]>({
  key: 'categories',
  default: [],
  dangerouslyAllowMutability: true,
});
