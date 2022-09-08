import { useMutation, useQueryClient } from '@tanstack/react-query';
import createTempPost from '../../apis/tempPost/createTempPost';

const useCreateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(createTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

export default useCreateTempPost;
