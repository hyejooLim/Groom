import { useQueryClient, useMutation } from '@tanstack/react-query';

import createComment from '../../apis/comment/createComment';
import deleteComment from '../../apis/comment/deleteComment';
import updateComment from '../../apis/comment/updateComment';

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

export { useCreateComment, useDeleteComment, useUpdateComment };
