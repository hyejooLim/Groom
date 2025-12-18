import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getPost from "../../apis/post/getPost";
import createPost from "../../apis/post/createPost";
import updatePost from "../../apis/post/updatePost";
import deletePost from "../../apis/post/deletePost";
import likePost from "../../apis/post/likePost";
import unLikePost from "../../apis/post/unLikePost";
import subscribePost from "../../apis/post/subscribePost";
import unSubscribePost from "../../apis/post/unSubscribePost";
import sharePost from "../../apis/post/sharePost";
import toggleIsPublicPost from "../../apis/post/toggleIsPublicPost";

const useGetPost = (id: number) => {
  const query = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    refetchOnWindowFocus: false,
  });

  return query;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
};

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

const useUnLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unLikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

const useSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["userSubscribedPosts"] });
    },
  });
};

const useUnSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unSubscribePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["userSubscribedPosts"] });
    },
  });
};

const useSharePost = () => {
  return useMutation({
    mutationFn: sharePost,
  });
};

const useToggleIsPublicPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleIsPublicPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
};

export {
  useGetPost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useLikePost,
  useUnLikePost,
  useSubscribePost,
  useUnSubscribePost,
  useSharePost,
  useToggleIsPublicPost,
};
