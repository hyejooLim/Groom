import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";

import AppLayout from "../../components/layouts/AppLayout";
import Title from "../../components/common/Title";
import PostList from "../../components/post/PostList";
import getUser from "../../apis/user/getUser";
import getCategories from "../../apis/categories/getCategories";
import getPostsIncludeCategory from "../../apis/posts/getPostsIncludeCategory";
import { useGetPostsIncludeCategory } from "../../hooks/query/posts";
import { productionURL } from "../../constants/URL";
import { CategoryItem } from "../../types";
import prisma from "../../lib/prisma";

const Category = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts, isLoading } = useGetPostsIncludeCategory(String(name));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 카테고리의 글 목록</title>
      </Head>
      <Title title={name as string} />
      <PostList
        posts={posts}
        pathname={`/category/${name}`}
        currentPage={Number(page)}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export const getStaticPaths = (async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true },
    });
    const paths = categories.map(({ name }) => ({
      params: { name },
    }));

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
      queryKey: ["posts", "category", String(name)],
      queryFn: () => getPostsIncludeCategory(String(name)),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}) satisfies GetStaticProps;

export default Category;
