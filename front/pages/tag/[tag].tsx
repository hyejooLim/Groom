import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import { mainPosts } from '..';

const Tag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const posts = mainPosts.filter((post) => post.tags && post.tags[0].name?.includes(tag as string));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{tag}' 태그의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={tag as string} />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export default Tag;
