import clientApi from '..';
import { PostItem } from '../../types';

const searchUserPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  if (keyword === 'undefined') {
    return;
  }

  const response = await clientApi.get<PostItem[]>(`/search/user/posts/${keyword}/${searchType}`);
  return response;
};

export default searchUserPosts;
