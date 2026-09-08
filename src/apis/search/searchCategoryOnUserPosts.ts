import clientApi from '..';
import { CategoryItem } from '@/@types/types';

const searchCategoryOnUserPosts = async (categoryId: number): Promise<CategoryItem> => {
  const response = await clientApi.get<CategoryItem>(`/search/user/posts/category/${categoryId}`);
  return response;
};

export default searchCategoryOnUserPosts;
