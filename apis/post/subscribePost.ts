import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const subscribePost = async (id: number) => {
  const response = await clientApi.put(`/post/${id}/subscribe`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default subscribePost;
