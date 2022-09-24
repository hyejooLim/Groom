import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import useGetTags from '../../hooks/query/useGetTags';

const Tag = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data: tags } = useGetTags();
  const posts = tags && tags?.find((tag) => tag.name === name).posts;

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 태그의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      {posts && <PostList posts={posts.filter((post) => post.isPublic)} />}
    </AppLayout>
  );
};

export default Tag;
