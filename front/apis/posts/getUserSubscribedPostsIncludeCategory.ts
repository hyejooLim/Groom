import clientApi from '..';
import { PostItem } from '../../types';

const getUserSubscribedPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/user/subscribedPosts/category/${categoryId}`);

  return response;
};

export default getUserSubscribedPostsIncludeCategory;
