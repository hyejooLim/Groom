import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({
    id: '1',
    title: '입국심사',
    category: 'algorithm',
    content: '...',
    author: 'sandy',
    authorId: '77',
    createdAt: '2022.06.12',
  });

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
