import clientApi from '..';
import { CategoryItem } from '../../types';

const searchCategoryOnUserSubscribedPosts = async (categoryId: number | undefined): Promise<CategoryItem> => {
  if (categoryId === undefined) {
    return;
  }

  const response = await clientApi.get<CategoryItem>(`/search/user/subscribedPosts/category/${categoryId}`);
  return response;
};

export default searchCategoryOnUserSubscribedPosts;
