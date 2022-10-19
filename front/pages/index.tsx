import React from 'react';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/common/Title';
import PostList from '../components/post/PostList';
import { useGetPosts } from '../hooks/query/posts';

const Home = () => {
  const { data: posts } = useGetPosts();

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export default Home;
