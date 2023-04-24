import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/common/Title';
import PostList from '../components/post/PostList';
import getPosts from '../apis/posts/getPosts';
import getUser from '../apis/user/getUser';
import getCategories from '../apis/categories/getCategories';
import getVisitorsCount from '../apis/count';
import { useGetPosts, useGetPostsPerPage } from '../hooks/query/posts';

const Home = () => {
  const router = useRouter();
  const { page } = router.query;

  const { data: posts } = useGetPosts();
  const { data: postsByPage, isLoading } = useGetPostsPerPage(page ? Number(page) : -1);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={postsByPage} pathname='/' total={posts?.length} page={Number(page)} isLoading={isLoading} />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { req } = context;
  // const session = await getSession({ req });
  // const email = session && session?.user.email;

  const queryClient = new QueryClient();
  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

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

// export const getStaticProps: GetStaticProps = async () => {
//   const queryClient = new QueryClient();
//   const session = await getSession();
//   console.log('session!!', session);

//   await Promise.all([
//     queryClient.prefetchQuery(['user'], getUser),
//     queryClient.prefetchQuery(['posts'], getPosts),
//     queryClient.prefetchQuery(['categories'], getCategories),
//     queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
//   ]);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default Home;
