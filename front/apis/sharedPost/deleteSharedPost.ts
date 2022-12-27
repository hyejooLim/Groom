import clientApi from '..';

const deleteSharedPost = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/sharedPost/${id}`);
};

export default deleteSharedPost;
