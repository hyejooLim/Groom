import clientApi from '..';
import { PostItem } from '../../types';

const getUserSubscribedPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${categoryId}/userSubscribedPosts`);

  return response;
};

export default getUserSubscribedPostsIncludeCategory;
