import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/post/PostCard';
import getUser from '../../apis/user/getUser';
import getPost from '../../apis/post/getPost';
import getComments from '../../apis/comments/getComments';
import getCategories from '../../apis/categories/getCategories';
import { PostItem } from '../../types';
import { productionURL } from '../../constants/URL';
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

  const handlePostDelete = (id: number) => {
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
          <PostCard post={post} onDeletePost={handlePostDelete} />
        </AppLayout>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await axios.get(`${productionURL}/api/posts`);
  const posts = result.data as PostItem[];

  const paths = posts.map(({ id }) => ({ params: { id: String(id) } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['post', Number(id)], () => getPost(Number(id))),
    queryClient.prefetchQuery(['comments', Number(id)], () => getComments(Number(id))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export default Post;
