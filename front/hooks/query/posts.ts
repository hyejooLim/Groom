import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { mainPostsState } from '../../recoil/posts';
import getPosts from '../../apis/posts/getPosts';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
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

const useGetPostsIncludeCategory = (categoryId: number) =>
  useQuery(['posts', categoryId], () => getPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('postsIncludeCategory', data);
    },
  });

const useGetSubscribedPostsIncludeCategory = (categoryId: number) =>
  useQuery(['subscribedPosts', categoryId], () => getSubscribedPostsIncludeCategory(categoryId), {
    onSuccess: (data) => {
      console.log('subscribedPostsIncludeCategory', data);
    },
  });

export { useGetPosts, useGetPostsIncludeCategory, useGetSubscribedPostsIncludeCategory };
