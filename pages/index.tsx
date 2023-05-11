import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/common/Title';
import PostList from '../components/post/PostList';
import getUser from '../apis/user/getUser';
import getPosts from '../apis/posts/getPosts';
import getCategories from '../apis/categories/getCategories';
import { useGetPosts, useGetPostsPerPage } from '../hooks/query/posts';

const Home = () => {
  const router = useRouter();
  const { page } = router.query;

  const { data: posts } = useGetPosts();
  const { data: postsByPage, isLoading } = useGetPostsPerPage(page ? Number(page) : 1);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={postsByPage} pathname='/' total={posts?.length} page={Number(page)} isLoading={isLoading} />
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['posts'], getPosts),
    queryClient.prefetchQuery(['categories'], getCategories),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
