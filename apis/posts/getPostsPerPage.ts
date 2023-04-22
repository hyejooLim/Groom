import clientApi from '..';
import { PostItem } from '../../types';

const getPostsPerPage = async (page: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/posts/${page}`);

  return response;
};

export default getPostsPerPage;
