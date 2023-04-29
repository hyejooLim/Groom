import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getCategories from '../../apis/categories/getCategories';
import getUserWithEmail from '../../apis/user/getUserWithEmail';
import getVisitorsCount from '../../apis/count';
import { useGetPostsIncludeTag, useGetPostsPerPageIncludeTag } from '../../hooks/query/posts';

const Tag = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts } = useGetPostsIncludeTag(String(name));
  const { data: postsPerPage, isLoading } = useGetPostsPerPageIncludeTag(String(name), page ? Number(page) : 1);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 태그의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      <PostList
        posts={postsPerPage}
        pathname={`/tag/${name}`}
        total={posts?.length}
        page={Number(page)}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params;

  const session = await getSession(context);
  const email = session ? session.user.email : null;

  const queryClient = new QueryClient();
  context.res.setHeader('Cache-Control', 'public, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['user', email], () => getUserWithEmail(email)),
    queryClient.prefetchQuery(['posts', 'tag', String(name)], () => getPostsIncludeTag(String(name))),
  ]);

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Tag;
