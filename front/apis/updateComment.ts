interface UpdateComment {
  id: number;
  content: string;
}

const updateComment = async ({ data }: { data: UpdateComment }): Promise<Response> => {
  const response = await fetch(`/api/comment/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default updateComment;
