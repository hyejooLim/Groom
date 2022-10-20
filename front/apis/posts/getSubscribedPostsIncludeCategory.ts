import clientApi from '..';
import { PostItem } from '../../types';

const getSubscribedPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${categoryId}/subscribedPosts`);

  return response;
};

export default getSubscribedPostsIncludeCategory;
