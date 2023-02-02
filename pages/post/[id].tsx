import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/post/PostCard';
import getUser from '../../apis/user/getUser';
import getPost from '../../apis/post/getPost';
import getComments from '../../apis/comments/getComments';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import { useGetPost } from '../../hooks/query/post';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: post } = useGetPost(Number(id));

  const computePopoverTop = () => {
    const popover = document.querySelector('.popover') as HTMLDivElement;
    const shareButton = document.querySelector('.share') as HTMLButtonElement;

    const popoverHeightPx = getComputedStyle(popover).height;
    const popoverHeight = Number(popoverHeightPx.slice(0, -2)) + 10;
    const shareButtonClientY = shareButton.getBoundingClientRect().y;

    popover.style.top = shareButtonClientY - popoverHeight + 'px';
  };

  useEffect(() => {
    computePopoverTop();
    window.addEventListener('scroll', computePopoverTop, true);

    return () => {
      window.removeEventListener('scroll', computePopoverTop, true);
    };
  }, []);

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

  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['post', Number(id)], () => getPost(Number(id))),
    queryClient.prefetchQuery(['comments', Number(id)], () => getComments(Number(id))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Post;
