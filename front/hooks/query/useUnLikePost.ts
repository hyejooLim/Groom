import { useMutation, useQueryClient } from '@tanstack/react-query';
import unLikePost from '../../apis/post/unLikePost';

const useUnLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(unLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

export default useUnLikePost;
