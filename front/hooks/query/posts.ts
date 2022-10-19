import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import getPosts from '../../apis/posts/getPosts';
import getFilteredMainPosts from '../../apis/posts/getFilteredMainPosts';
import { mainPostsState } from '../../recoil/posts';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(data);
      console.log('posts', data);
    },
  });
};

const useGetFilteredMainPosts = (keyword: string) => {
  return useQuery(['posts', keyword], () => getFilteredMainPosts(keyword), {
    onSuccess: (data) => {
      console.log('filteredMainposts', data);
    },
    staleTime: 30000, // 3분 이내로 같은 키워드 검색 시 캐싱 값이 리턴
  });
};

export { useGetPosts, useGetFilteredMainPosts };
