import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import getUser from '../../apis/user/getUser';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import { useGetPostsIncludeCategory, useGetPostsPerPageIncludeCategory } from '../../hooks/query/posts';
import { productionURL } from '../../constants/URL';
import { CategoryItem } from '../../types';

const Category = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts } = useGetPostsIncludeCategory(String(name));
  const { data: postsPerPage, isLoading } = page
    ? useGetPostsPerPageIncludeCategory(String(name), Number(page))
    : useGetPostsPerPageIncludeCategory(String(name), -1);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 카테고리의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      <PostList
        posts={postsPerPage}
        pathname={`/category/${name}`}
        total={posts?.length}
        page={Number(page)}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await axios.get(`${productionURL}/api/categories`);
  const categories = result.data as CategoryItem[];

  const paths = categories.map(({ name }) => ({ params: { name } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['posts', 'category', String(name)], () => getPostsIncludeCategory(String(name))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Category;
