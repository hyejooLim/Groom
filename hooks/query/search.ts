import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import searchPosts from "../../apis/search/searchPosts";
import searchUserPosts from "../../apis/search/searchUserPosts";
import searchNeighbors from "../../apis/search/searchNeighbors";
import searchUserSubscribedPosts from "../../apis/search/searchUserSubscribedPosts";
import searchUserSharedPosts from "../../apis/search/searchUserSharedPosts";
import searchCategoryOnUserPosts from "../../apis/search/searchCategoryOnUserPosts";
import searchCategoryOnUserSubscribedPosts from "../../apis/search/searchCategoryOnUserSubscribedPosts";
import searchCategoryOnUserSharedPosts from "../../apis/search/searchCategoryOnUserSharedPosts";
import {
  managePostsState,
  manageSubscribedPostsState,
  manageSharedPostsState,
} from "../../recoil/manage";
import { useEffect } from "react";

const useSearchPosts = (keyword: string) => {
  const query = useQuery({
    queryKey: ["posts", "keyword", keyword],
    queryFn: () => searchPosts(keyword),
    staleTime: 300000, // 5분 이내로 같은 키워드 검색 시 캐싱 값이 리턴
  });

  return query;
};

const useSearchUserPosts = (keyword: string, searchType: string) => {
  const setManagePosts = useSetRecoilState(managePostsState);

  const query = useQuery({
    queryKey: ["userPosts", keyword, searchType],
    queryFn: () => searchUserPosts(keyword, searchType),
    staleTime: Infinity, // 무한 fresh 상태 (api 요청 x)
    enabled: keyword !== "undefined",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManagePosts(query.data);
    }
  }, [query.data]);

  return query;
};

const useSearchNeighbors = (keyword: string) => {
  const query = useQuery({
    queryKey: ["neighbors", keyword],
    queryFn: () => searchNeighbors(keyword),
    staleTime: Infinity,
    enabled: keyword !== "undefined",
    refetchOnWindowFocus: false,
  });

  return query;
};

const useSearchUserSubscribedPosts = (keyword: string, searchType: string) => {
  const setManageSubscribedPosts = useSetRecoilState(
    manageSubscribedPostsState
  );

  const query = useQuery({
    queryKey: ["userSubscribedPosts", keyword, searchType],
    queryFn: () => searchUserSubscribedPosts(keyword, searchType),
    staleTime: Infinity,
    enabled: keyword !== "undefined",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManageSubscribedPosts(query.data);
    }
  }, [query.data]);

  return query;
};

const useSearchUserSharedPosts = (keyword: string, searchType: string) => {
  const setManageSharedPosts = useSetRecoilState(manageSharedPostsState);
  const query = useQuery({
    queryKey: ["userSharedPosts", keyword, searchType],
    queryFn: () => searchUserSharedPosts(keyword, searchType),
    staleTime: 180000, // 3분동안 fresh 상태
    enabled: keyword !== "undefined",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManageSharedPosts(query.data.receivedPosts);
    }
  }, [query.data]);

  return query;
};

const useSearchCategoryOnUserPosts = (categoryId: number) => {
  const setManagePosts = useSetRecoilState(managePostsState);

  const query = useQuery({
    queryKey: ["userPosts", "category", categoryId],
    queryFn: () => searchCategoryOnUserPosts(categoryId),
    staleTime: Infinity,
    enabled: !!categoryId, // categoryId가 존재할 때에만 쿼리 요청
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManagePosts(query.data.posts);
    }
  }, [query.data]);

  return query;
};

const useSearchCategoryOnUserSubscribedPosts = (
  categoryId: number | undefined
) => {
  const setManageSubscribedPosts = useSetRecoilState(
    manageSubscribedPostsState
  );

  const query = useQuery({
    queryKey: ["userSubscribedPosts", "category", categoryId],
    queryFn: () => searchCategoryOnUserSubscribedPosts(categoryId),
    staleTime: Infinity,
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManageSubscribedPosts(query.data.posts);
    }
  }, [query.data]);

  return query;
};

const useSearchCategoryOnUserSharedPosts = (categoryId: number | undefined) => {
  const setManageSharedPosts = useSetRecoilState(manageSharedPostsState);

  const query = useQuery({
    queryKey: ["userSharedPosts", "category", categoryId],
    queryFn: () => searchCategoryOnUserSharedPosts(categoryId),
    staleTime: 180000,
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setManageSharedPosts(query.data);
    }
  }, [query.data]);

  return query;
};

export {
  useSearchPosts,
  useSearchUserPosts,
  useSearchNeighbors,
  useSearchUserSubscribedPosts,
  useSearchUserSharedPosts,
  useSearchCategoryOnUserPosts,
  useSearchCategoryOnUserSubscribedPosts,
  useSearchCategoryOnUserSharedPosts,
};
