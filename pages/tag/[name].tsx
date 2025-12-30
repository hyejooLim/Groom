import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import AppLayout from "../../components/layouts/AppLayout";
import Title from "../../components/common/Title";
import PostList from "../../components/post/PostList";
import getUser from "../../apis/user/getUser";
import getPostsIncludeTag from "../../apis/posts/getPostsIncludeTag";
import getCategories from "../../apis/categories/getCategories";
import { useGetPostsIncludeTag } from "../../hooks/query/posts";
import prisma from "../../lib/prisma";

const Tag = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts, isLoading } = useGetPostsIncludeTag(String(name));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 태그의 글 목록</title>
      </Head>
      <Title title={name as string} />
      <PostList
        posts={posts}
        pathname={`/tag/${name}`}
        currentPage={Number(page)}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export const getStaticPaths = (async () => {
  try {
    const tags = await prisma.tag.findMany({
      select: { name: true },
    });

    const paths = tags.map(({ name }) => ({ params: { name } }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (err) {
    console.warn(
      "[getStaticPaths] DB not available. Falling back to empty paths."
    );

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const { name } = params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["user"], queryFn: getUser }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", "tag", String(name)],
      queryFn: () => getPostsIncludeTag(String(name)),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}) satisfies GetStaticProps;

export default Tag;
