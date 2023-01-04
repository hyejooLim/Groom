import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getUser from '../../apis/user/getUser';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import { useGetPostsIncludeTag } from '../../hooks/query/posts';

const Tag = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data: posts, isLoading } = useGetPostsIncludeTag(String(name));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 태그의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      <PostList posts={posts} isLoading={isLoading} />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params;
  const queryClient = new QueryClient();

  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['posts', 'tag', String(name)], () => getPostsIncludeTag(String(name))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Tag;
