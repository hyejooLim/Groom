import clientApi from '..';
import { PostItem } from '../../types';

const searchPosts = async (keyword: string, searchType: string): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/${keyword}/${searchType}/postManage`);

  return response;
};

export default searchPosts;
