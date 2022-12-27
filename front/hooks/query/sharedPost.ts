import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteSharedPost from '../../apis/sharedPost/deleteSharedPost';

const useDeleteSharedPost = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSharedPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userSharedPosts']);
    },
  });
};

export { useDeleteSharedPost };
