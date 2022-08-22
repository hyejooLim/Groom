import { PostItem } from '../types';

const getPost = async (id: number): Promise<PostItem> => {
  const response = await fetch(`/api/post/${id}`, {
    method: 'GET',
  });

  return response.json();
};

export default getPost;
