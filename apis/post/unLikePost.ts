import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const unLikePost = async (id: number) => {
  const response = await clientApi.delete(`/post/${id}/like`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default unLikePost;
