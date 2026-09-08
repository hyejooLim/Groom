import clientApi from '..';

const likePost = async (id: number) => {
  await clientApi.put(`/post/${id}/like`);
};

export default likePost;
