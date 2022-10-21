import clientApi from '..';
import { PostItem } from '../../types';

const searchUserPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}/${searchType}/userPosts`);

  return response;
};

export default searchUserPosts;
