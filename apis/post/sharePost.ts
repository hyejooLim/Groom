import clientApi from '..';
import { Sharer } from '../../types';

interface SharePostProps {
  id: number;
  sharers: Sharer[];
}

const sharePost = async (data: SharePostProps): Promise<Response> => {
  const { id, sharers } = data;
  return await clientApi.post(`/post/${id}/share`, { sharers });
};

export default sharePost;
