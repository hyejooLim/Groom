import { useMutation, useQueryClient } from '@tanstack/react-query';
import visitSharedPost from '../../apis/sharedPost/visitSharedPost';
import deleteSharedPost from '../../apis/sharedPost/deleteSharedPost';

const useVisitSharedPost = () => useMutation(visitSharedPost);

const useDeleteSharedPost = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteSharedPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userSharedPosts']);
    },
  });
};

export { useVisitSharedPost, useDeleteSharedPost };
