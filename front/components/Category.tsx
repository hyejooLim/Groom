import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CategoryItem } from '../types';

const CategoryWrapper = styled.div`
  padding: 20px 0 0 30px;
  display: flex;
  flex-direction: column;
  border-top: 1px dashed black;

  & li {
    color: #3b3e3f;
    font-size: 17px;
    margin-bottom: 13px;

    .category_item:hover {
      color: #07a;
    }
  }
`;

// dummy data
export const categories: CategoryItem[] = [
  {
    id: '1',
    name: 'algorithm',
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
        author: 'sandy',
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
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.06.11',
      },
      {
        id: '8',
        title: '점프와 순간 이동',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'tomas',
        authorId: '25',
        createdAt: '2022.05.28',
      },
      {
        id: '7',
        title: '끝말잇기',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'jenny',
        authorId: '12',
        createdAt: '2022.05.16',
      },
      {
        id: '2',
        title: '전화번호 목록',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.04.27',
      },
      {
        id: '1',
        title: '프린터',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'happy',
        authorId: '7',
        createdAt: '2022.04.03',
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
        author: 'tomas',
        authorId: '25',
        createdAt: '2022.04.30',
      },
    ],
  },
  {
    id: '3',
    name: 'typescript',
    posts: [
      {
        id: '5',
        title: '타입스크립트 시작하기',
        content: '...',
        Comments: [],
        Category: { id: '3', name: 'typescript' },
        author: 'elli',
        authorId: '11',
        createdAt: '2022.04.29',
      },
    ],
  },
  {
    id: '4',
    name: 'react',
    posts: [
      {
        id: '4',
        title: '리액트란?',
        content: '...',
        Comments: [],
        Category: { id: '4', name: 'react' },
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.04.24',
      },
      {
        id: '3',
        title: '리액트 프레임워크',
        content: '...',
        Comments: [],
        Category: { id: '4', name: 'react' },
        author: 'mint',
        authorId: '80',
        createdAt: '2022.04.20',
      },
    ],
  },
];

const Category = () => {
  return (
    <CategoryWrapper>
      <span style={{ fontSize: '21px', fontWeight: 800, margin: '20px 0' }}>Category</span>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a className='category_item'>
                {category.name} ({category.posts.length})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
