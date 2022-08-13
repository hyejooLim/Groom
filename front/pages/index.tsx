import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import { PostItem, UserType } from '../types';

export const user: UserType = {
  id: 77,
  name: '샌디',
  email: 'sandy@naver.com',
  password: '',
  comments: [],
  posts: [
    {
      id: 10,
      title: '입국심사',
      content:
        '<p>안녕</p><p>&nbsp;</p><p><img src="https://groom-project.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-08-09%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.26.08.png" data-filename="스크린샷 2022-08-09 오후 8.26.08.png"></p>',
      thumbnailContent: '안녕',
      tags: [],
      comments: [],
      likeCount: 0,
      category: { id: 1, name: 'algorithm' },
      author: null,
    },
  ],
  subscribedPosts: [
    {
      id: 13,
      title: '구독 포스트',
      content: '안녕',
      tags: [],
      comments: [],
      likeCount: 0,
      category: { id: 1, name: 'algorithm' },
      author: null,
    },
  ],
};

export const mainPosts: PostItem[] = [
  {
    id: 10,
    title: '입국심사',
    content: '...',
    tags: [{ name: 'algorithm' }],
    comments: [],
    author: null,
    category: { id: 1, name: 'algorithm' },
    createdAt: '2022.06.12',
  },
];

const DEFAULT_TITLE = '전체 글';

const Home = () => {
  const router = useRouter();
  const { keyword, targetPosts } = router.query;
  const parsedPosts = targetPosts && (JSON.parse(targetPosts as string) as PostItem[]);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (parsedPosts) {
      setTitle(keyword as string);
      setPosts(parsedPosts);
    } else {
      setTitle(DEFAULT_TITLE);
      setPosts([]);
    }
  }, [keyword]);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title={title} />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export default Home;
