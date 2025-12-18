import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import getPosts from "../../apis/posts/getPosts";
import getPostsIncludeTag from "../../apis/posts/getPostsIncludeTag";
import getPostsIncludeCategory from "../../apis/posts/getPostsIncludeCategory";
import getUserPosts from "../../apis/posts/getUserPosts";
import getUserSubscribedPosts from "../../apis/posts/getUserSubscribedPosts";
import getUserSharedPosts from "../../apis/posts/getUserSharedPosts";
import { mainPostsState } from "../../recoil/posts";

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setMainPosts(query.data);
    }
  }, [query.data]);

  return query;
};

const useGetPostsIncludeTag = (name: string) => {
  const query = useQuery({
    queryKey: ["posts", "tag", name],
    queryFn: () => getPostsIncludeTag(name),
    refetchOnWindowFocus: false,
  });

  return query;
};

const useGetPostsIncludeCategory = (name: string) => {
  const query = useQuery({
    queryKey: ["posts", "category", name],
    queryFn: () => getPostsIncludeCategory(name),
    refetchOnWindowFocus: false,
  });

  return query;
};

const useGetUserPosts = () => {
  const query = useQuery({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
    refetchOnWindowFocus: false,
  });

  return query;
};

const useGetUserSubscribedPosts = () => {
  const query = useQuery({
    queryKey: ["userSubscribedPosts"],
    queryFn: getUserSubscribedPosts,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};

const useGetUserSharedPosts = () => {
  const query = useQuery({
    queryKey: ["userSharedPosts"],
    queryFn: getUserSharedPosts,
    staleTime: 180000,
    refetchOnWindowFocus: false,
  });

  return query;
};

export {
  useGetPosts,
  useGetPostsIncludeTag,
  useGetPostsIncludeCategory,
  useGetUserPosts,
  useGetUserSubscribedPosts,
  useGetUserSharedPosts,
};
