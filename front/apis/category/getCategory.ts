import { CategoryItem } from '../../types';

const getCategory = async (name: string): Promise<CategoryItem> => {
  const response = await fetch(`/api/category/${name}`, {
    method: 'GET',
  });

  return response.json();
};

export default getCategory;
