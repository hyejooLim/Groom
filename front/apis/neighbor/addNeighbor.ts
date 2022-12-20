import clientApi from '..';

const addNeighbor = async (neighborId: number): Promise<Response> => {
  return await clientApi.put('/user/neighbor', { neighborId });
};

export default addNeighbor;
