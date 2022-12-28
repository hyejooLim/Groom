import clientApi from '..';

const visitSharedPost = async (id: number): Promise<Response> => {
  return await clientApi.put(`/sharedPost/${id}`);
};

export default visitSharedPost;
