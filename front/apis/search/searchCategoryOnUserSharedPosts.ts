import clientApi from '..';
import { SharedPost } from './../../types';

const searchCategoryOnUserSharedPosts = async (categoryId: number | undefined): Promise<SharedPost[]> => {
  if (categoryId === undefined) {
    return;
  }

  const response = await clientApi.get<SharedPost[]>(`/search/user/sharedPosts/category/${categoryId}`);
  return response;
};

export default searchCategoryOnUserSharedPosts;
