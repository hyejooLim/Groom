import clientApi from '..';
import { CategoryItem } from '../../types';

const searchCategoryOnUserPosts = async (categoryId: number | undefined): Promise<CategoryItem> => {
  if (categoryId === undefined) {
    return;
  }

  const response = await clientApi.get<CategoryItem>(`/search/user/posts/category/${categoryId}`);
  return response;
};

export default searchCategoryOnUserPosts;
