import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateComment from '../../apis/comment/updateComment';

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

export default useUpdateComment;
