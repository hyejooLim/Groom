import clientApi from '..';
import { CategoryItem } from '../../types';

const getCategories = async (): Promise<CategoryItem[]> => {
  const response = await clientApi.get<CategoryItem[]>('/categories');

  return response;
};

export default getCategories;
