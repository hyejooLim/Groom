import clientApi from '..';

interface UpdateComment {
  id: number;
  content: string;
}

const updateComment = async ({ data }: { data: UpdateComment }): Promise<Response> => {
  return await clientApi.put(`/comment/${data.id}`, data);
};

export default updateComment;
