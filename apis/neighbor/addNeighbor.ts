import clientApi from '..';

const addNeighbor = async (id: number): Promise<Response> => {
  return await clientApi.put(`/neighbor/${id}`);
};

export default addNeighbor;
