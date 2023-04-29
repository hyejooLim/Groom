import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/post/PostCard';
import getPost from '../../apis/post/getPost';
import getComments from '../../apis/comments/getComments';
import getCategories from '../../apis/categories/getCategories';
import getUserWithEmail from '../../apis/user/getUserWithEmail';
import getVisitorsCount from '../../apis/count';
import { useDeletePost, useGetPost } from '../../hooks/query/post';
import Page404 from '../404';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const deletePost = useDeletePost();
  const { data: post } = useGetPost(Number(id));

  useEffect(() => {
    if (deletePost.isSuccess) {
      alert('정상적으로 삭제되었습니다.');
      router.push('/');
    }
  }, [deletePost.isSuccess]);

  const computePopoverTop = () => {
    if (post) {
      const popover = document.querySelector('.popover') as HTMLDivElement;
      const shareButton = document.querySelector('.share') as HTMLButtonElement;

      const popoverHeightPx = getComputedStyle(popover).height;
      const popoverHeight = Number(popoverHeightPx.slice(0, -2)) + 10;
      const shareButtonClientY = shareButton.getBoundingClientRect().y;

      popover.style.top = shareButtonClientY - popoverHeight + 'px';
    }
  };

  const handleDeletePost = (id: number) => {
    deletePost.mutate(id);
  };

  useEffect(() => {
    computePopoverTop();
    window.addEventListener('scroll', computePopoverTop, true);

    return () => {
      window.removeEventListener('scroll', computePopoverTop, true);
    };
  }, []);

  return (
    <>
      {post === null ? (
        <Page404 />
      ) : (
        <AppLayout>
          <Head>
            <title>Groom | {id}번째 게시글</title>
          </Head>
          <PostCard post={post} onDeletePost={handleDeletePost} />
        </AppLayout>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  const session = await getSession(context);
  const email = session ? session.user.email : null;

  const queryClient = new QueryClient();
  context.res.setHeader('Cache-Control', 'public, max-age=59'); // max-age 더 크게 설정

  await Promise.all([
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['user', email], () => getUserWithEmail(email)),
    queryClient.prefetchQuery(['post', Number(id)], () => getPost(Number(id))),
    queryClient.prefetchQuery(['comments', Number(id)], () => getComments(Number(id))),
  ]);

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Post;
