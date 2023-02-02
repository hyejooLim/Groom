import clientApi from '..';
import { PostItem } from '../../types';

const searchUserSubscribedPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  if (keyword === 'undefined') {
    return;
  }

  const response = await clientApi.get<PostItem[]>(`/search/user/subscribedPosts/${keyword}/${searchType}`);
  return response;
};

export default searchUserSubscribedPosts;
