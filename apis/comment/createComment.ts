import clientApi from '..';
interface CreateCommentProps {
  content: string;
  postId: number;
}

const createComment = async ({ data }: { data: CreateCommentProps }): Promise<Response> => {
  return await clientApi.post('/comment', data);
};

export default createComment;
