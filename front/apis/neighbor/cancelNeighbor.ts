import clientApi from '..';

const cancelNeighbor = async (id: number): Promise<Response> => {
  return await clientApi.delete(`/neighbor/${id}`);
};

export default cancelNeighbor;
