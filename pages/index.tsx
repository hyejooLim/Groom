import React from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios, { HeadersDefaults } from 'axios';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/common/Title';
import PostList from '../components/post/PostList';
import getPosts from '../apis/posts/getPosts';
import getUser from '../apis/user/getUser';
import getCategories from '../apis/categories/getCategories';
import getVisitorsCount from '../apis/count';
import { useGetPosts } from '../hooks/query/posts';

const Home = () => {
  const { data: posts, isLoading } = useGetPosts();

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={posts} isLoading={isLoading} />
    </AppLayout>
  );
};

interface HeadersDefaultWithCookie extends HeadersDefaults {
  Cookie: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  // const cookie = context.req ? context.req.headers.cookie : '';

  // if (context.req && cookie) {
  //   axios.defaults.headers = {
  //     Cookie: cookie,
  //   } as HeadersDefaultWithCookie;
  // }

  const queryClient = new QueryClient();
  // context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['posts'], getPosts),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
