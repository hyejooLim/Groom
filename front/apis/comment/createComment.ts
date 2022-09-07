interface CreateCommentProps {
  content: string;
  postId: number;
}

const createComment = async ({ data }: { data: CreateCommentProps }): Promise<Response> => {
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default createComment;
