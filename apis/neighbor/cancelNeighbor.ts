import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const cancelNeighbor = async (id: number) => {
  const response = await clientApi.delete(`/neighbor/${id}`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default cancelNeighbor;
