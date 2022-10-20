import clientApi from '..';
import { PostItem } from '../../types';

const searchPostsIncludeCategory = async (categoryId: number): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>(`/search/category/${categoryId}/posts`);

  return response;
};

export default searchPostsIncludeCategory;
