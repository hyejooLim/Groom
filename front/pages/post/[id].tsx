import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/PostCard';
import useGetPost from '../../hooks/query/useGetPost';

const Post = () => {
  const router = useRouter();
  const { id, idx } = router.query;

  const { data: post } = useGetPost(Number(id));

  return (
    <AppLayout>
      <Head>
        <title>Groom | {id}번째 게시글</title>
      </Head>
      {post && <PostCard post={post} idx={Number(idx)} />}
    </AppLayout>
  );
};

export default Post;
