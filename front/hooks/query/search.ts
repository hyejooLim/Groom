import { useQuery } from '@tanstack/react-query';

import searchMainPosts from '../../apis/search/searchMainPosts';
import searchPosts from '../../apis/search/searchPosts';
import searchSubscribedPosts from '../../apis/search/searchSubscribedPosts';

const useSearchMainPosts = (keyword: string) => {
  return useQuery(['posts', keyword], () => searchMainPosts(keyword), {
    onSuccess: (data) => {
      console.log('filteredMainposts', data);
    },
    staleTime: 30000, // 3분 이내로 같은 키워드 검색 시 캐싱 값이 리턴
  });
};

const useSearchPosts = (keyword: string, searchType: string) =>
  useQuery(['posts', keyword, searchType], () => searchPosts(keyword, searchType), {
    onSuccess: (data) => {
      console.log('searchPosts', data);
    },
  });

const useSearchSubscribedPosts = (keyword: string, searchType: string) =>
  useQuery(['subscribedPosts', keyword, searchType], () => searchSubscribedPosts(keyword, searchType), {
    onSuccess: (data) => {
      console.log('searchPosts', data);
    },
  });

export { useSearchMainPosts, useSearchPosts, useSearchSubscribedPosts };
