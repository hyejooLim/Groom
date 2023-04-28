import clientApi from '..';

const addNeighbor = async (id: number) => {
  await clientApi.put(`/neighbor/${id}`);
};

export default addNeighbor;
