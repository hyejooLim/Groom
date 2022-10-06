import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import toggleIsPublicPost from '../../apis/post/toggleIsPublicPost';

const useToggleIsPublicPost = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleIsPublicPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export default useToggleIsPublicPost;
