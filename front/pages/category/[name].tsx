import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import { useGetPostsIncludeCategory } from '../../hooks/query/posts';

const Category = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const { data: posts } = useGetPostsIncludeCategory(Number(id));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 카테고리의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      {posts && <PostList posts={posts} />}
    </AppLayout>
  );
};

export default Category;
