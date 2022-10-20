import clientApi from '..';
import { PostItem } from '../../types';

const getPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${categoryId}/posts`);

  return response;
};

export default getPostsIncludeCategory;
