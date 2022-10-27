import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import searchPosts from '../../apis/search/searchPosts';
import searchUserPosts from '../../apis/search/searchUserPosts';
import searchUserSubscribedPosts from '../../apis/search/searchUserSubscribedPosts';
import searchCategoryOnUserPosts from '../../apis/search/searchCategoryOnUserPosts';
import searchCategoryOnUserSubscribedPosts from '../../apis/search/searchCategoryOnUserSubscribedPosts';
import { managePostsState, manageSubscribedPostsState } from './../../recoil/manage';

const useSearchPosts = (keyword: string) => {
  return useQuery(['posts', 'keyword', keyword], () => searchPosts(keyword), {
    onSuccess: (data) => {
      console.log('searchPosts', data);
    },
    staleTime: 30000, // 3분 이내로 같은 키워드 검색 시 캐싱 값이 리턴
  });
};

const useSearchUserPosts = (keyword: string, searchType: string) => {
  const setManagePosts = useSetRecoilState(managePostsState);

  return useQuery(['userPosts', keyword, searchType], () => searchUserPosts(keyword, searchType), {
    onSuccess: (data) => {
      setManagePosts(data);
      console.log('searchUserPosts', data);
    },
    refetchOnWindowFocus: false,
  });
};

const useSearchUserSubscribedPosts = (keyword: string, searchType: string) => {
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(['userSubscribedPosts', keyword, searchType], () => searchUserSubscribedPosts(keyword, searchType), {
    onSuccess: (data) => {
      setManageSubscribedPosts(data);
      console.log('searchUserSubscribedPosts', data);
    },
    refetchOnWindowFocus: false,
  });
};

const useSearchCategoryOnUserPosts = (categoryId: number | undefined) => {
  const setManagePosts = useSetRecoilState(managePostsState);

  return useQuery(['userPosts', 'category', categoryId], () => searchCategoryOnUserPosts(categoryId), {
    onSuccess: (data) => {
      setManagePosts(data.posts);
      console.log('searchCategoryOnUserPosts', data);
    },
    refetchOnWindowFocus: false,
  });
};

const useSearchCategoryOnUserSubscribedPosts = (categoryId: number | undefined) => {
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(
    ['userSubscribedPosts', 'category', categoryId],
    () => searchCategoryOnUserSubscribedPosts(categoryId),
    {
      onSuccess: (data) => {
        setManageSubscribedPosts(data.posts);
        console.log('searchCategoryOnUserSubscribedPosts', data);
      },
      refetchOnWindowFocus: false,
    }
  );
};

export {
  useSearchPosts,
  useSearchUserPosts,
  useSearchUserSubscribedPosts,
  useSearchCategoryOnUserPosts,
  useSearchCategoryOnUserSubscribedPosts,
};
