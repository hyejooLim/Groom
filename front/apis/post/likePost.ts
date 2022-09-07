const likePost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/post/${id}/like`, {
    method: 'PUT',
  });

  return response;
};

export default likePost;
