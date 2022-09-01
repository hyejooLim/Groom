const unLikePost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/post/${id}/like`, { method: 'DELETE' });
  return response;
};

export default unLikePost;
