import clientApi from '..';

const unLikePost = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/post/${id}/like`);
};

export default unLikePost;
