import clientApi from '..';

const unLikePost = async (id: number) => {
  await clientApi.delete(`/post/${id}/like`);
};

export default unLikePost;
