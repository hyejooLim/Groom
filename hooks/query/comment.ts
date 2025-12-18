import { useQueryClient, useMutation } from "@tanstack/react-query";

import createComment from "../../apis/comment/createComment";
import deleteComment from "../../apis/comment/deleteComment";
import updateComment from "../../apis/comment/updateComment";

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export { useCreateComment, useDeleteComment, useUpdateComment };
