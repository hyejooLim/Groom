import { useMutation, useQueryClient } from "@tanstack/react-query";

import createTempPost from "../../apis/tempPost/createTempPost";
import deleteTempPost from "../../apis/tempPost/deleteTempPost";
import updateTempPost from "../../apis/tempPost/updateTempPost";

const useCreateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTempPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempPosts"] });
    },
  });
};

const useDeleteTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTempPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempPosts"] });
    },
  });
};

const useUpdateTempPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTempPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempPosts"] });
    },
  });
};

export { useCreateTempPost, useDeleteTempPost, useUpdateTempPost };
