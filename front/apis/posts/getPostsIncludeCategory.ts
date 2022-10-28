import clientApi from '..';
import { PostItem } from '../../types';

const getPostsIncludeCategory = async (name: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${name}`);

  return response;
};

export default getPostsIncludeCategory;
