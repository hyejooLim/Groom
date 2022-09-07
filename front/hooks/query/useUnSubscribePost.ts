import { useMutation, useQueryClient } from '@tanstack/react-query';
import unSubscribePost from '../../apis/post/unSubscribePost';

const useUnSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation(unSubscribePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      queryClient.invalidateQueries(['user']);
    },
  });
};

export default useUnSubscribePost;
