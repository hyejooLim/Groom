const subscribePost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/post/${id}/subscribe`, {
    method: 'PUT',
  });

  return response;
};

export default subscribePost;
