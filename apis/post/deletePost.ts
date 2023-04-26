import clientApi from '..';

const deletePost = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/post/${id}`);
};

export default deletePost;
