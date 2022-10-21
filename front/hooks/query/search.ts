import { useQuery } from '@tanstack/react-query';

import searchPosts from '../../apis/search/searchPosts';
import searchUserPosts from '../../apis/search/searchUserPosts';
import searchUserSubscribedPosts from '../../apis/search/searchUserSubscribedPosts';

const useSearchPosts = (keyword: string) => {
  return useQuery(['posts', keyword], () => searchPosts(keyword), {
    onSuccess: (data) => {
      console.log('searchPosts', data);
    },
    staleTime: 30000, // 3분 이내로 같은 키워드 검색 시 캐싱 값이 리턴
  });
};

const useSearchUserPosts = (keyword: string, searchType: string) =>
  useQuery(['userPosts', keyword, searchType], () => searchUserPosts(keyword, searchType), {
    onSuccess: (data) => {
      console.log('searchUserPosts', data);
    },
  });

const useSearchUserSubscribedPosts = (keyword: string, searchType: string) =>
  useQuery(['userSubscribedPosts', keyword, searchType], () => searchUserSubscribedPosts(keyword, searchType), {
    onSuccess: (data) => {
      console.log('searchUserSubscribedPosts', data);
    },
  });

export { useSearchPosts, useSearchUserPosts, useSearchUserSubscribedPosts };
