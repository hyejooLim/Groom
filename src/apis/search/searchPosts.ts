import clientApi from '..';
import { PostItem } from '@/@types/types';

const searchPosts = async (keyword: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}`);

  return response;
};

export default searchPosts;
