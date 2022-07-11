import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PaginationContainer from '../components/PaginationContainer';
import { PostItem, UserType } from '../types';

const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all; // ?
  height: 430px;

  & ul {
    border-top: 1px dotted #ddd;

    & li {
      padding: 12px 10px 9px;
      font-size: 14px;
      border-bottom: 1px dotted #ddd;

      & a:hover {
        color: #07a;
      }
    }
  }
`;

const PostInfo = styled.div`
  float: right;

  & span {
    color: #666;
  }
`;

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
      subscriberCount: 10,
      postCount: 4,
    },
    {
      id: '7',
      name: '해피',
      subscriberCount: 2,
      postCount: 1,
    },
    {
      id: '12',
      name: '제니',
      subscriberCount: 522,
      postCount: 1000,
    },
    {
      id: '80',
      name: '민트',
      subscriberCount: 99,
      postCount: 200,
    },
  ],
};

export const mainPosts: PostItem[] = [
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

const Home = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <ListWrapper>
        <ul>
          {mainPosts?.slice(firstIndex, lastIndex).map((post) => (
            <li key={post.id}>
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a style={{ fontSize: '15px' }}>
                  [{post.Category.name}] {post.title}
                </a>
              </Link>
              <PostInfo>
                <span style={{ marginRight: 8 }}>{post.author}</span>
                <span>{post.createdAt}</span>
              </PostInfo>
            </li>
          ))}
        </ul>
      </ListWrapper>
      <PaginationContainer pageSize={pageSize} current={currentPage} total={mainPosts.length} onChange={onChangePage} />
    </AppLayout>
  );
};

export default Home;
