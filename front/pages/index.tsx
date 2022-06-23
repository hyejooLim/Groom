import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import Title from '../components/Title';
import PaginationContainer from '../components/PaginationContainer';
import { PostType } from '../types';

const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all; // ?
  height: 448px;

  & ul {
    margin: 0;
    border-top: 1px dotted #ddd;

    & li {
      padding: 12px 10px 9px;
      font-size: 14px;
      border-bottom: 1px dotted #ddd;
    }
  }
`;

const PostInfo = styled.div`
  float: right;
`;

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: '1',
      title: '입국심사',
      content: '...',
      author: 'sandy',
      category: 'algorithm',
      authorId: '77',
      createdAt: '2022.06.12',
    },
    {
      id: '2',
      title: '거리두기 확인하기',
      content: '...',
      category: 'algorithm',
      author: 'sandy',
      authorId: '77',
      createdAt: '2022.06.11',
    },
    {
      id: '3',
      title: '점프와 순간 이동',
      content: '...',
      category: 'algorithm',
      author: 'tomas',
      authorId: '25',
      createdAt: '2022.05.28',
    },
    {
      id: '4',
      title: '끝말잇기',
      content: '...',
      category: 'algorithm',
      author: 'jenny',
      authorId: '12',
      createdAt: '2022.05.16',
    },
    {
      id: '5',
      title: '자바스크립트 알아보기',
      content: '...',
      category: 'javascript',
      author: 'tomas',
      authorId: '25',
      createdAt: '2022.04.30',
    },
    {
      id: '6',
      title: '타입스크립트 시작하기',
      content: '...',
      category: 'typescript',
      author: 'elli',
      authorId: '11',
      createdAt: '2022.04.29',
    },
    {
      id: '7',
      title: '리액트란?',
      content: '...',
      category: 'react',
      author: 'sandy',
      authorId: '77',
      createdAt: '2022.04.24',
    },
    {
      id: '8',
      title: '리액트 프레임워크',
      content: '...',
      category: 'react',
      author: 'mint',
      authorId: '80',
      createdAt: '2022.04.20',
    },
    {
      id: '9',
      title: '전화번호 목록',
      content: '...',
      category: 'algorithm',
      author: 'sandy',
      authorId: '77',
      createdAt: '2022.04.27',
    },
    {
      id: '10',
      title: '프린터',
      content: '...',
      category: 'algorithm',
      author: 'happy',
      authorId: '7',
      createdAt: '2022.04.03',
    },
  ]);
  const pageSize = 8;
  const [current, setCurrent] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrent(page);
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
          {posts?.slice(firstIndex, lastIndex).map((post, idx) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`}>
                <a style={{ fontSize: '15px' }}>
                  [{post.category}] {post.title}
                </a>
              </Link>
              <PostInfo>
                <span style={{ color: '#666', marginRight: 8 }}>{post.author}</span>
                <span style={{ color: '#666' }}>{post.createdAt}</span>
              </PostInfo>
            </li>
          ))}
        </ul>
      </ListWrapper>
      <PaginationContainer
        posts={posts}
        pageSize={pageSize}
        current={current}
        total={posts.length}
        onChange={onChangePage}
      />
    </AppLayout>
  );
};

export default Home;
