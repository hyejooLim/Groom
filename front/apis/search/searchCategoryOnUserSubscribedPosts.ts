import clientApi from '..';
import { CategoryItem } from '../../types';

const searchCategoryOnUserSubscribedPosts = async (categoryId: number): Promise<CategoryItem> => {
  const response = await clientApi.get<CategoryItem>(`/search/user/subscribedPosts/category/${categoryId}`);

  return response;
};

export default searchCategoryOnUserSubscribedPosts;
