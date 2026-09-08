import clientApi from '..';

const unSubscribePost = async (id: number) => {
  await clientApi.delete(`/post/${id}/subscribe`);
};

export default unSubscribePost;
