import { useMutation, useQueryClient } from "@tanstack/react-query";
import visitSharedPost from "../../apis/sharedPost/visitSharedPost";
import deleteSharedPost from "../../apis/sharedPost/deleteSharedPost";

const useVisitSharedPost = () =>
  useMutation({
    mutationFn: visitSharedPost,
  });

const useDeleteSharedPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSharedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSharedPosts"] });
    },
  });
};

export { useVisitSharedPost, useDeleteSharedPost };
