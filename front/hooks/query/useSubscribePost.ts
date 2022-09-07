import { useMutation, useQueryClient } from '@tanstack/react-query';
import subscribePost from '../../apis/post/subscribePost';

const useSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation(subscribePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

export default useSubscribePost;
