import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getPosts from '../../apis/posts/getPosts';
import getPostsPerPage from '../../apis/posts/getPostsPerPage';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getPostsPerPageIncludeTag from '../../apis/posts/getPostsPerPageIncludeTag';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import getPostsPerPageIncludeCategory from '../../apis/posts/getPostsPerPageIncludeCategory';
import getUserPosts from '../../apis/posts/getUserPosts';
import getUserSubscribedPosts from '../../apis/posts/getUserSubscribedPosts';
import getUserSharedPosts from '../../apis/posts/getUserSharedPosts';
import { mainPostsState } from '../../recoil/posts';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(data);
    },

    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });
};

const useGetPostsPerPage = (page: number) => {
  return useQuery(['posts', 'page', page], () => getPostsPerPage(page), {
    refetchOnWindowFocus: false,
  });
};

const useGetPostsIncludeTag = (name: string) => useQuery(['posts', 'tag', name], () => getPostsIncludeTag(name));

const useGetPostsPerPageIncludeTag = (name: string, page: number) => {
  return useQuery(['posts', 'tag', name, 'page', page], () => getPostsPerPageIncludeTag(name, page), {
    refetchOnWindowFocus: false,
  });
};

const useGetPostsIncludeCategory = (name: string) =>
  useQuery(['posts', 'category', name], () => getPostsIncludeCategory(name));

const useGetPostsPerPageIncludeCategory = (name: string, page: number) => {
  return useQuery(['posts', 'category', name, 'page', page], () => getPostsPerPageIncludeCategory(name, page), {
    refetchOnWindowFocus: false,
  });
};

const useGetUserPosts = () =>
  useQuery(['userPosts'], getUserPosts, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

const useGetUserSubscribedPosts = () =>
  useQuery(['userSubscribedPosts'], getUserSubscribedPosts, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

const useGetUserSharedPosts = () =>
  useQuery(['userSharedPosts'], getUserSharedPosts, {
    staleTime: 180000,
    refetchOnWindowFocus: false,
  });

export {
  useGetPosts,
  useGetPostsPerPage,
  useGetPostsIncludeTag,
  useGetPostsPerPageIncludeTag,
  useGetPostsIncludeCategory,
  useGetPostsPerPageIncludeCategory,
  useGetUserPosts,
  useGetUserSubscribedPosts,
  useGetUserSharedPosts,
};
