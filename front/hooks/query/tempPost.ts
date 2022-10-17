import { useMutation, useQueryClient } from '@tanstack/react-query';

import createTempPost from '../../apis/tempPost/createTempPost';
import deleteTempPost from '../../apis/tempPost/deleteTempPost';
import updateTempPost from '../../apis/tempPost/updateTempPost';

const useCreateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(createTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

const useDeleteTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

const useUpdateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTempPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tempPosts']);
    },
  });
};

export { useCreateTempPost, useDeleteTempPost, useUpdateTempPost };
