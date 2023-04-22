import clientApi from '..';
import { PostItem } from '../../types';

const searchPostsPerPage = async (keyword: string, page: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}/${page}`);

  return response;
};

export default searchPostsPerPage;
