import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const addNeighbor = async (id: number) => {
  const response = await clientApi.put(`/neighbor/${id}`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default addNeighbor;
