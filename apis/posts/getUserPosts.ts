import clientApi from '..';
import { PostItem } from '../../types';

const getUserPosts = async (): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>('/user/posts');

  return response;
};

export default getUserPosts;
