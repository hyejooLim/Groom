import { useMutation, useQueryClient } from '@tanstack/react-query';
import likePost from '../../apis/post/likePost';

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

export default useLikePost;
