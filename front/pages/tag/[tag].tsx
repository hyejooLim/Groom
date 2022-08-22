import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import useGetPosts from '../../hooks/query/useGetPosts';

const Tag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const { data: posts } = useGetPosts();

  // const posts => tag와 같은 name을 가진 게시글 반환

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
