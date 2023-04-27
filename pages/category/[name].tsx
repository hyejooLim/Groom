import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import getPostsIncludeCategory from '../../apis/posts/getPostsIncludeCategory';
import { useGetPostsIncludeCategory, useGetPostsPerPageIncludeCategory } from '../../hooks/query/posts';

const Category = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts } = useGetPostsIncludeCategory(String(name));
  const { data: postsPerPage, isLoading } = useGetPostsPerPageIncludeCategory(String(name), page ? Number(page) : 1);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { name } = context.params;

  const queryClient = new QueryClient();
  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['posts', 'category', String(name)], () => getPostsIncludeCategory(String(name))),
  ]);

  return {
    props: {
      session: await getSession({ req }),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Category;
