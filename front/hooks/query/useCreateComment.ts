import { useQueryClient, useMutation } from '@tanstack/react-query';
import createComment from '../../apis/createComment';

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

export default useCreateComment;
