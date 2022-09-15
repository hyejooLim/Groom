const deleteTempPost = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/tempPost/${id}`, {
    method: 'DELETE',
  });

  return response;
};

export default deleteTempPost;
