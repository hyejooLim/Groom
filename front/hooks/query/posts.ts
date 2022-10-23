import { managePostsState, manageSubscribedPostsState } from './../../recoil/manage';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { mainPostsState } from '../../recoil/posts';
import getPosts from '../../apis/posts/getPosts';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import getUserPosts from '../../apis/posts/getUserPosts';
import getUserSubscribedPosts from '../../apis/posts/getUserSubscribedPosts';
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
  });
};

const useGetUserSubscribedPosts = () => {
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(['userSubscribedPosts'], getUserSubscribedPosts, {
    onSuccess: (data) => {
      setManageSubscribedPosts(data);
      console.log('userSubscribedPosts', data);
    },
  });
};

const useGetUserPostsIncludeCategory = (categoryId: number) =>
  useQuery(['userPosts', 'category', categoryId], () => getUserPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('userPostsIncludeCategory', data);
    },
  });

const useGetUserSubscribedPostsIncludeCategory = (categoryId: number) =>
  useQuery(['userSubscribedPosts', 'category', categoryId], () => getUserSubscribedPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('userSubscribedPostsIncludeCategory', data);
    },
  });

export {
  useGetPosts,
  useGetPostsIncludeTag,
  useGetPostsIncludeCategory,
  useGetUserPosts,
  useGetUserSubscribedPosts,
  useGetUserPostsIncludeCategory,
  useGetUserSubscribedPostsIncludeCategory,
};
