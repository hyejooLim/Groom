import clientApi from '..';
import { PostItem } from '../../types';

const getPost = async (id: number): Promise<PostItem> => {
  const response = await clientApi.get<PostItem>(`/post/${id}`);

  return response;
};

export default getPost;
