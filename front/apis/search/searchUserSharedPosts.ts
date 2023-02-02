import clientApi from '..';
import { UserType } from '../../types';

const searchUserSharedPosts = async (keyword: string, searchType: string): Promise<UserType> => {
  if (keyword === 'undefined') {
    return;
  }

  const response = await clientApi.get<UserType>(`/search/user/sharedPosts/${keyword}/${searchType}`);
  return response;
};

export default searchUserSharedPosts;
