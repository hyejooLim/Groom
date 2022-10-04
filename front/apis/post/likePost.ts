import clientApi from '..';

const likePost = async (id: number): Promise<Response> => {
  return await clientApi.put(`/post/${id}/like`);
};

export default likePost;
