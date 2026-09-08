import clientApi from '..';
import { PostItem } from '@/@types/types';

const getUserSubscribedPosts = async (): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>('/user/subscribedPosts');

  return response;
};

export default getUserSubscribedPosts;
