import { CommentItem } from '../types';

const getComments = async (postId: number): Promise<CommentItem[]> => {
  const response = await fetch(`/api/comments/${postId}`, {
    method: 'GET',
  });

  return response.json();
};

export default getComments;
