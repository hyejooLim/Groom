import clientApi from '..';
import { PostItem } from '../../types';

const searchUserSubscribedPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}/${searchType}/userSubscribedPosts`);

  return response;
};

export default searchUserSubscribedPosts;
