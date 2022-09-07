import React from 'react';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import useGetPosts from '../hooks/query/useGetPosts';

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
