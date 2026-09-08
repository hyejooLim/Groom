import clientApi from '..';

const subscribePost = async (id: number) => {
  await clientApi.put(`/post/${id}/subscribe`);
};

export default subscribePost;
