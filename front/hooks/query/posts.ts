import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getPosts from '../../apis/posts/getPosts';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import getUserPosts from '../../apis/posts/getUserPosts';
import getUserSubscribedPosts from '../../apis/posts/getUserSubscribedPosts';
import { mainPostsState } from '../../recoil/posts';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(data);
      console.log('posts', data);
    },
    refetchInterval: 10000, // 10초마다 로드
    refetchOnWindowFocus: false,
  });
};

const useGetPostsIncludeTag = (name: string) =>
  useQuery(['posts', 'tag', name], () => getPostsIncludeTag(name), {
    onSuccess: (data) => {
      console.log('postsIncludeTag', data);
    },
  });

const useGetPostsIncludeCategory = (name: string) =>
  useQuery(['posts', 'category', name], () => getPostsIncludeCategory(name), {
    onSuccess: (data) => {
      console.log('postsIncludeCategory', data);
    },
  });

const useGetUserPosts = () =>
  useQuery(['userPosts'], getUserPosts, {
    onSuccess: (data) => {
      console.log('userPosts', data);
    },
    refetchOnWindowFocus: false,
  });

const useGetUserSubscribedPosts = () =>
  useQuery(['userSubscribedPosts'], getUserSubscribedPosts, {
    onSuccess: (data) => {
      console.log('userSubscribedPosts', data);
    },
    refetchOnWindowFocus: false,
  });

export { useGetPosts, useGetPostsIncludeTag, useGetPostsIncludeCategory, useGetUserPosts, useGetUserSubscribedPosts };
