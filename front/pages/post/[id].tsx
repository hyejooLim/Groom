import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/PostCard';
import { PostItem } from '../../types';

const Post = () => {
  const router = useRouter();
  const { id, post } = router.query;
  const parsedPost = post && (JSON.parse(post as string) as PostItem);

  return (
    <AppLayout>
      <Head>
        <title>Groom | {id}번째 게시글</title>
      </Head>
      {post && <PostCard post={parsedPost} />}
    </AppLayout>
  );
};

export default Post;
