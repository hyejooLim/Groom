const deleteComment = async (id: number): Promise<Response> => {
  const response = await fetch(`/api/comment/${id}`, {
    method: 'DELETE',
  });

  return response;
};

export default deleteComment;
