import clientApi from '..';
import { PostItem } from '../../types';

const getPostsPerPageIncludeCategory = async (name: string, page: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/category/${name}/${page}`);

  return response;
};

export default getPostsPerPageIncludeCategory;
