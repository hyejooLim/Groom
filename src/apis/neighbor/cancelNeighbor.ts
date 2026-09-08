import clientApi from '..';

const cancelNeighbor = async (id: number) => {
  await clientApi.delete(`/neighbor/${id}`);
};

export default cancelNeighbor;
