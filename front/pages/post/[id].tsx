import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/post/PostCard';
import getUser from '../../apis/user/getUser';
import getPost from '../../apis/post/getPost';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import { useGetPost } from '../../hooks/query/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: post } = useGetPost(Number(id));

  return (
    <AppLayout>
      <Head>
        <title>Groom | {id}번째 게시글</title>
      </Head>
      {post && <PostCard post={post} />}
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['post', Number(id)], () => getPost(Number(id))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Post;
