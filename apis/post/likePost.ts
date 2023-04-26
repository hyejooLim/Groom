import clientApi from '..';
import { revalidatePostPage } from '../revalidate';

const likePost = async (id: number) => {
  const response = await clientApi.put(`/post/${id}/like`);

  if (response === 'ok') {
    revalidatePostPage(id);
  }
};

export default likePost;
