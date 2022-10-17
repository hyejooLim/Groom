import React from 'react';
import { useRecoilValue } from 'recoil';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/common/Title';
import PostList from '../components/post/PostList';
import { mainPostsState } from '../recoil/posts';

const Home = () => {
  const mainPosts = useRecoilValue(mainPostsState);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={mainPosts} />
    </AppLayout>
  );
};

export default Home;
