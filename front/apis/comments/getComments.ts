import clientApi from '..';
import { CommentItem } from '../../types';

const getComments = async (postId: number): Promise<CommentItem[]> => {
  const response = await clientApi.get<CommentItem[]>(`/comments/${postId}`);

  return response;
};

export default getComments;
