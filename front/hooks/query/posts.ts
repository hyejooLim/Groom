import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { mainPostsState } from '../../recoil/posts';
import getPosts from '../../apis/posts/getPosts';
import getUserPostsIncludeCategory from '../../apis/posts/getUserPostsIncludeCategory';
import getSubscribedPostsIncludeCategory from '../../apis/posts/getSubscribedPostsIncludeCategory';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(data);
      console.log('posts', data);
    },
  });
};

const useGetUserPostsIncludeCategory = (categoryId: number) =>
  useQuery(['posts', categoryId], () => getUserPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('userPostsIncludeCategory', data);
    },
  });

const useGetSubscribedPostsIncludeCategory = (categoryId: number) =>
  useQuery(['subscribedPosts', categoryId], () => getSubscribedPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('subscribedPostsIncludeCategory', data);
    },
  });

export { useGetPosts, useGetUserPostsIncludeCategory, useGetSubscribedPostsIncludeCategory };
