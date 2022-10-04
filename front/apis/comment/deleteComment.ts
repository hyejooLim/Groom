import clientApi from '..';

const deleteComment = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/comment/${id}`);
};

export default deleteComment;
