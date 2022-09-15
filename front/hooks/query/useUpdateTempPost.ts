import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTempPost from '../../apis/tempPost/updateTempPost';

const useUpdateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

export default useUpdateTempPost;
