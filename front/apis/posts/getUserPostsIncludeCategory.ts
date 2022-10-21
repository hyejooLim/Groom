import clientApi from '..';
import { PostItem } from '../../types';

const getUserPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${categoryId}/userPosts`);

  return response;
};

export default getUserPostsIncludeCategory;
