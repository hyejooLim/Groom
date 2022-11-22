import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import getPost from '../../apis/post/getPost';
import deletePost from '../../apis/post/deletePost';
import likePost from '../../apis/post/likePost';
import unLikePost from '../../apis/post/unLikePost';
import subscribePost from '../../apis/post/subscribePost';
import unSubscribePost from '../../apis/post/unSubscribePost';
import toggleIsPublicPost from '../../apis/post/toggleIsPublicPost';

const useGetPost = (id: number) => {
  return useQuery(['post', id], () => getPost(id), {
    onError: (err) => {
      throw new Error('Request failed.', err);
    },
  });
};

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['userPosts']);
    },
  });
};

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

const useUnLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation(unLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

const useSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation(subscribePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });
};

const useUnSubscribePost = () => {
  const queryClient = useQueryClient();

  return useMutation(unSubscribePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      queryClient.invalidateQueries(['user']);
    },
  });
};

const useToggleIsPublicPost = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleIsPublicPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userPosts']);
    },
  });
};

export {
  useGetPost,
  useDeletePost,
  useLikePost,
  useUnLikePost,
  useSubscribePost,
  useUnSubscribePost,
  useToggleIsPublicPost,
};
