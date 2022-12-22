import clientApi from '..';
import { Sharer } from '../../types';

interface SharePostProps {
  postId: number;
  sharers: Sharer[];
}

const sharePost = async (data: SharePostProps): Promise<Response> => {
  const { postId, sharers } = data;
  return await clientApi.post('/share/post', { postId, sharers });
};

export default sharePost;
