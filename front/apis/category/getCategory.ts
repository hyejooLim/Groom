import clientApi from '..';
import { CategoryItem } from '../../types';

const getCategory = async (name: string): Promise<CategoryItem> => {
  const response = await clientApi.get<CategoryItem>(`/category/${name}`);

  return response;
};

export default getCategory;
