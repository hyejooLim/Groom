import { CategoryItem } from '../../types';

const getCategories = async (): Promise<CategoryItem[]> => {
  const response = await fetch('/api/categories', {
    method: 'GET',
  });

  return response.json();
};

export default getCategories;
