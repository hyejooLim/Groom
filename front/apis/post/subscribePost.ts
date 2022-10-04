import clientApi from '..';

const subscribePost = async (id: number): Promise<Response> => {
  return await clientApi.put(`/post/${id}/subscribe`);
};

export default subscribePost;
