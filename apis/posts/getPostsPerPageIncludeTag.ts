import clientApi from '..';
import { PostItem } from '../../types';

const getPostsPerPageIncludeTag = async (name: string, page: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/tag/${name}/${page}`);

  return response;
};

export default getPostsPerPageIncludeTag;
