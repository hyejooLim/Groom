import clientApi from '..';
import { PostItem } from '../../types';

const getPostsIncludeTag = async (name: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/tag/${name}`);

  return response;
};

export default getPostsIncludeTag;
