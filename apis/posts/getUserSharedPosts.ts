import clientApi from '..';
import { SharedPost } from '../../types';

const getUserSharedPosts = async (): Promise<SharedPost[]> => {
  const response = await clientApi.get<SharedPost[]>('/user/sharedPosts');
  return response;
};

export default getUserSharedPosts;
