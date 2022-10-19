import clientApi from '..';
import { PostItem } from '../../types';

const getFilteredMainPosts = async (keyword: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}`);

  return response;
};

export default getFilteredMainPosts;
