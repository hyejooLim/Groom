import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { mainPostsState } from '../../recoil/posts';
import getPosts from '../../apis/posts/getPosts';
import getUserPostsIncludeCategory from '../../apis/posts/getUserPostsIncludeCategory';
import getUserSubscribedPostsIncludeCategory from '../../apis/posts/getUserSubscribedPostsIncludeCategory';

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
  useQuery(['userPosts', categoryId], () => getUserPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('userPostsIncludeCategory', data);
    },
  });

const useGetUserSubscribedPostsIncludeCategory = (categoryId: number) =>
  useQuery(['userSubscribedPosts', categoryId], () => getUserSubscribedPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('userSubscribedPostsIncludeCategory', data);
    },
  });

export { useGetPosts, useGetUserPostsIncludeCategory, useGetUserSubscribedPostsIncludeCategory };
