import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePost from '../../apis/post/deletePost';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['user']);
    },
  });
};

export default useDeletePost;
