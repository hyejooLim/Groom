import clientApi from '..';
import { PostItem } from '../../types';

const getPostsIncludeTag = async (tagId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/tag/${tagId}`);

  return response;
};

export default getPostsIncludeTag;
