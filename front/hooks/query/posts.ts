import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getPosts from '../../apis/posts/getPosts';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import getUserPosts from '../../apis/posts/getUserPosts';
import getUserSubscribedPosts from '../../apis/posts/getUserSubscribedPosts';
import { mainPostsState } from '../../recoil/posts';
import { managePostsState, manageSubscribedPostsState } from './../../recoil/manage';

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

const useGetPostsIncludeTag = (tagId: number) =>
  useQuery(['posts', 'tag', tagId], () => getPostsIncludeTag(tagId), {
    onSuccess: (data) => {
      console.log('postsIncludeTag', data);
    },
  });

const useGetPostsIncludeCategory = (categoryId: number) =>
  useQuery(['posts', 'category', categoryId], () => getPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('postsIncludeCategory', data);
    },
  });

const useGetUserPosts = () => {
  const setManagePosts = useSetRecoilState(managePostsState);

  return useQuery(['userPosts'], getUserPosts, {
    onSuccess: (data) => {
      setManagePosts(data);
      console.log('userPosts', data);
    },
    refetchOnWindowFocus: false,
  });
};

const useGetUserSubscribedPosts = () => {
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(['userSubscribedPosts'], getUserSubscribedPosts, {
    onSuccess: (data) => {
      setManageSubscribedPosts(data);
      console.log('userSubscribedPosts', data);
    },
    refetchOnWindowFocus: false,
  });
};

export { useGetPosts, useGetPostsIncludeTag, useGetPostsIncludeCategory, useGetUserPosts, useGetUserSubscribedPosts };
