import { useMutation, useQueryClient } from '@tanstack/react-query';
import unSubscribePost from '../../apis/unSubscribePost';

const useUnSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation(unSubscribePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

export default useUnSubscribePost;
