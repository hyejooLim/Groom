const unSubscribePost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/post/${id}/subscribe`, {
    method: 'DELETE',
  });

  return response;
};

export default unSubscribePost;
