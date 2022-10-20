import clientApi from '..';
import { PostItem } from '../../types';

const searchSubscribedPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}/${searchType}/subscribedPosts`);

  return response;
};

export default searchSubscribedPosts;
