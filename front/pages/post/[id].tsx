import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/post/PostCard';
import useGetPost from '../../hooks/query/useGetPost';

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

export default Post;
