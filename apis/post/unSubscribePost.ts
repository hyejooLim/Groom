import clientApi from '..';

const unSubscribePost = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/post/${id}/subscribe`);
};

export default unSubscribePost;
