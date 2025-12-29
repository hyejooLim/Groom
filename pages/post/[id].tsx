import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import AppLayout from "../../components/layouts/AppLayout";
import PostCard from "../../components/post/PostCard";
import getUser from "../../apis/user/getUser";
import getPost from "../../apis/post/getPost";
import getComments from "../../apis/comments/getComments";
import getCategories from "../../apis/categories/getCategories";
import { useDeletePost, useGetPost } from "../../hooks/query/post";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const deletePost = useDeletePost();
  const { data: post } = useGetPost(Number(id));

  useEffect(() => {
    if (deletePost.isSuccess) {
      alert("정상적으로 삭제되었습니다.");
      router.push("/");
    }
  }, [deletePost.isSuccess]);

  const computePopoverTop = () => {
    if (post) {
      const popover = document.querySelector(".popover") as HTMLDivElement;
      const shareButton = document.querySelector(".share") as HTMLButtonElement;
      if (popover === null) return;

      const popoverHeightPx = getComputedStyle(popover).height;
      const popoverHeight = Number(popoverHeightPx.slice(0, -2)) + 10;
      const shareButtonClientY = shareButton.getBoundingClientRect().y;

      popover.style.top = shareButtonClientY - popoverHeight + "px";
    }
  };

  const handlePostDelete = (id: number) => {
    deletePost.mutate(id);
  };

  useEffect(() => {
    computePopoverTop();
    window.addEventListener("scroll", computePopoverTop, true);

    return () => {
      window.removeEventListener("scroll", computePopoverTop, true);
    };
  }, []);

  useEffect(() => {
    if (post === null || post === undefined) {
      router.replace("/404");
    }
  }, [post]);

  return (
    <AppLayout>
      <Head>
        <title>Groom | {id}번째 게시글</title>
      </Head>
      <PostCard post={post} onDeletePost={handlePostDelete} />
    </AppLayout>
  );
};

export const getServerSideProps = (async ({ params }) => {
  const { id } = params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["user"], queryFn: getUser }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["post", Number(id)],
      queryFn: () => getPost(Number(id)),
    }),
    queryClient.prefetchQuery({
      queryKey: ["comments", Number(id)],
      queryFn: () => getComments(Number(id)),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps;

export default Post;
