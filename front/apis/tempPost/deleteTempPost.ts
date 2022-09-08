const deleteTempPost = async (id: number): Promise<Response> => {
  const response = await fetch('/api/tempPost', {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default deleteTempPost;
