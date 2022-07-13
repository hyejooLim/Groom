import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import { PostItem, UserType } from '../types';

export const user: UserType = {
  id: '77',
  name: '샌디',
  email: 'sandy@naver.com',
  posts: [
    {
      id: '10',
      title: '입국심사',
      content: '...',
      Comments: [
        {
          content: '좋은 글 보고 가요~',
          datetime: '2022.06.23',
          User: {
            id: '25',
            name: '토마스',
            email: 'tomas@naver.com',
          },
        },
        {
          content: '샌디님 오늘은 뭐하셨나요??',
          datetime: '2022.06.25',
          User: {
            id: '80',
            name: '민트',
            email: 'mint@naver.com',
          },
        },
      ],
      author: '샌디',
      Category: { id: '1', name: 'algorithm' },
      authorId: '77',
      createdAt: '2022.06.12',
    },
    {
      id: '9',
      title: '거리두기 확인하기',
      content: '...',
      Comments: [],
      likeCount: 10,
      Category: { id: '1', name: 'algorithm' },
      author: '샌디',
      authorId: '77',
      createdAt: '2022.06.11',
    },
    {
      id: '4',
      title: '리액트란?',
      content: '...',
      Comments: [],
      Category: { id: '4', name: 'react' },
      author: '샌디',
      authorId: '77',
      createdAt: '2022.04.24',
    },
    {
      id: '2',
      title: '전화번호 목록',
      content: '...',
      Comments: [],
      Category: { id: '1', name: 'algorithm' },
      author: '샌디',
      authorId: '77',
      createdAt: '2022.04.27',
    },
  ],
  subscribers: [
    {
      id: '25',
      name: '토마스',
      email: 'tomas@naver.com',
      subscribers: [],
      posts: [
        {
          id: '8',
          title: '점프와 순간 이동',
          content: '...',
          Comments: [],
          Category: { id: '1', name: 'algorithm' },
          author: '토마스',
          authorId: '25',
          createdAt: '2022.05.28',
        },
        {
          id: '6',
          title: '자바스크립트 알아보기',
          content: '...',
          Comments: [],
          Category: { id: '2', name: 'javascript' },
          author: '토마스',
          authorId: '25',
          createdAt: '2022.04.30',
        },
      ],
      categories: [
        {
          id: '1',
          name: 'algorithm',
          posts: [
            {
              id: '8',
              title: '점프와 순간 이동',
              content: '...',
              Comments: [],
              Category: { id: '1', name: 'algorithm' },
              author: '토마스',
              authorId: '25',
              createdAt: '2022.05.28',
            },
          ],
        },
        {
          id: '2',
          name: 'javascript',
          posts: [
            {
              id: '6',
              title: '자바스크립트 알아보기',
              content: '...',
              Comments: [],
              Category: { id: '2', name: 'javascript' },
              author: '토마스',
              authorId: '25',
              createdAt: '2022.04.30',
            },
          ],
        },
        {
          id: '3',
          name: 'typescript',
          posts: [],
        },
        {
          id: '4',
          name: 'react',
          posts: [],
        },
      ],
    },
    {
      id: '7',
      name: '해피',
      email: 'happy@naver.com',
      subscribers: [],
      posts: [
        {
          id: '1',
          title: '프린터',
          content: '...',
          Comments: [],
          Category: { id: '1', name: 'algorithm' },
          author: '해피',
          authorId: '7',
          createdAt: '2022.04.03',
        },
      ],
      categories: [
        {
          id: '1',
          name: 'algorithm',
          posts: [
            {
              id: '1',
              title: '프린터',
              content: '...',
              Comments: [],
              Category: { id: '1', name: 'algorithm' },
              author: '해피',
              authorId: '7',
              createdAt: '2022.04.03',
            },
          ],
        },
        {
          id: '2',
          name: 'javascript',
          posts: [],
        },
        {
          id: '3',
          name: 'typescript',
          posts: [],
        },
        {
          id: '4',
          name: 'react',
          posts: [],
        },
      ],
    },
    {
      id: '12',
      name: '제니',
      email: 'jenny@naver.com',
      subscribers: [],
      posts: [
        {
          id: '7',
          title: '끝말잇기',
          content: '...',
          Comments: [],
          Category: { id: '1', name: 'algorithm' },
          author: '제니',
          authorId: '12',
          createdAt: '2022.05.16',
        },
      ],
      categories: [
        {
          id: '1',
          name: 'algorithm',
          posts: [
            {
              id: '7',
              title: '끝말잇기',
              content: '...',
              Comments: [],
              Category: { id: '1', name: 'algorithm' },
              author: '제니',
              authorId: '12',
              createdAt: '2022.05.16',
            },
          ],
        },
        {
          id: '2',
          name: 'javascript',
          posts: [],
        },
        {
          id: '3',
          name: 'typescript',
          posts: [],
        },
        {
          id: '4',
          name: 'react',
          posts: [],
        },
      ],
    },
    {
      id: '80',
      name: '민트',
      email: 'mint@naver.com',
      subscribers: [],
      posts: [
        {
          id: '3',
          title: '리액트 프레임워크',
          content: '...',
          Comments: [],
          Category: { id: '4', name: 'react' },
          author: '민트',
          authorId: '80',
          createdAt: '2022.04.20',
        },
      ],
      categories: [
        {
          id: '1',
          name: 'algorithm',
          posts: [],
        },
        {
          id: '2',
          name: 'javascript',
          posts: [],
        },
        {
          id: '3',
          name: 'typescript',
          posts: [],
        },
        {
          id: '4',
          name: 'react',
          posts: [
            {
              id: '3',
              title: '리액트 프레임워크',
              content: '...',
              Comments: [],
              Category: { id: '4', name: 'react' },
              author: '민트',
              authorId: '80',
              createdAt: '2022.04.20',
            },
          ],
        },
      ],
    },
  ],
};

export const mainPosts: PostItem[] = [
  {
    id: '10',
    title: '입국심사',
    content: '...',
    tags: ['입국심사', '이분탐색', '프로그래머스'],
    Comments: [
      {
        content: '좋은 글 보고 가요~',
        datetime: '2022.06.23',
        User: {
          id: '25',
          name: '토마스',
          email: 'tomas@naver.com',
        },
      },
      {
        content: '샌디님 오늘은 뭐하셨나요??',
        datetime: '2022.06.25',
        User: {
          id: '80',
          name: '민트',
          email: 'mint@naver.com',
        },
      },
    ],
    author: '샌디',
    Category: { id: '1', name: 'algorithm' },
    authorId: '77',
    createdAt: '2022.06.12',
  },
  {
    id: '9',
    title: '거리두기 확인하기',
    content: '...',
    tags: ['프로그래머스'],
    Comments: [],
    Category: { id: '1', name: 'algorithm' },
    author: '샌디',
    authorId: '77',
    createdAt: '2022.06.11',
  },
  {
    id: '8',
    title: '점프와 순간 이동',
    content: '...',
    Comments: [],
    Category: { id: '1', name: 'algorithm' },
    author: '토마스',
    authorId: '25',
    createdAt: '2022.05.28',
  },
  {
    id: '7',
    title: '끝말잇기',
    content: '...',
    Comments: [],
    Category: { id: '1', name: 'algorithm' },
    author: '제니',
    authorId: '12',
    createdAt: '2022.05.16',
  },
  {
    id: '6',
    title: '자바스크립트 알아보기',
    content: '...',
    Comments: [],
    Category: { id: '2', name: 'javascript' },
    author: '토마스',
    authorId: '25',
    createdAt: '2022.04.30',
  },
  {
    id: '5',
    title: '타입스크립트 시작하기',
    content: '...',
    Comments: [],
    Category: { id: '3', name: 'typescript' },
    author: '엘리',
    authorId: '11',
    createdAt: '2022.04.29',
  },
  {
    id: '4',
    title: '리액트란?',
    content: '...',
    Comments: [],
    Category: { id: '4', name: 'react' },
    author: '샌디',
    authorId: '77',
    createdAt: '2022.04.24',
  },
  {
    id: '3',
    title: '리액트 프레임워크',
    content: '...',
    Comments: [],
    Category: { id: '4', name: 'react' },
    author: '민트',
    authorId: '80',
    createdAt: '2022.04.20',
  },
  {
    id: '2',
    title: '전화번호 목록',
    content: '...',
    Comments: [],
    Category: { id: '1', name: 'algorithm' },
    author: '샌디',
    authorId: '77',
    createdAt: '2022.04.27',
  },
  {
    id: '1',
    title: '프린터',
    content: '...',
    Comments: [],
    Category: { id: '1', name: 'algorithm' },
    author: '해피',
    authorId: '7',
    createdAt: '2022.04.03',
  },
];

const DEFAULT_TITLE = '전체 글';

const Home = () => {
  const router = useRouter();
  const { keyword, targetPosts } = router.query;
  const parsedPosts = targetPosts && (JSON.parse(targetPosts as string) as PostItem[]);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [posts, setPosts] = useState(mainPosts);

  useEffect(() => {
    if (parsedPosts) {
      setTitle(keyword as string);
      setPosts(parsedPosts);
    } else {
      setTitle(DEFAULT_TITLE);
      setPosts(mainPosts);
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
