import clientApi from '..';

const cancelNeighbor = async (neighborId: number): Promise<Response> => {
  return await clientApi.delete('/user/neighbor', { data: { neighborId } });
};

export default cancelNeighbor;
