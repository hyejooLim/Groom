import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const unSubscribePost = async (id: number) => {
  const response = await clientApi.delete(`/post/${id}/subscribe`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default unSubscribePost;
