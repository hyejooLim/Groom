const deletePost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });

  return response;
};

export default deletePost;
