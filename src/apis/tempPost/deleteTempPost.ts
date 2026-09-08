import clientApi from '..';

const deleteTempPost = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/tempPost/${id}`);
};

export default deleteTempPost;
