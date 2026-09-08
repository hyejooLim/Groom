import clientApi from '..';

interface ToggleIsPublicPostProps {
  id: number;
  isPublic: boolean;
}

const toggleIsPublicPost = async (data: ToggleIsPublicPostProps): Promise<Response> => {
  return await clientApi.put(`/post/${data.id}/toggle`, data);
};

export default toggleIsPublicPost;
