import clientApi from '..';
import { PostItem } from '@/@types/types';

const getPosts = async (): Promise<PostItem[]> => {
  const response = await clientApi.get<PostItem[]>('/posts');

  return response;
};

export default getPosts;
