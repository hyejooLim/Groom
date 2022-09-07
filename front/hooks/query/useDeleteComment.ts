import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteComment from '../../apis/comment/deleteComment';

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

export default useDeleteComment;
