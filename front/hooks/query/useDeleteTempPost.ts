import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteTempPost from '../../apis/tempPost/deleteTempPost';

const useDeleteTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

export default useDeleteTempPost;
