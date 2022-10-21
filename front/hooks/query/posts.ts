import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { mainPostsState } from '../../recoil/posts';
import getPosts from '../../apis/posts/getPosts';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
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
  useGetUserPostsIncludeCategory,
  useGetUserSubscribedPostsIncludeCategory,
};
