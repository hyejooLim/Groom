import React from 'react';
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
    font-size: 15px;
    margin-bottom: 10px;

    .category_item:hover {
      color: #07a;
    }
  }
`;

// dummy data
export const categories: CategoryItem[] = [
  {
    name: 'algorithm',
  },
  {
    name: 'typescript',
  },
  {
    name: 'react',
  },
  {
    name: 'next',
  },
];

const Category = () => {
  return (
    <CategoryWrapper>
      <span style={{ fontSize: '18px', fontWeight: 600, margin: '20px 0 30px 0' }}>카테고리</span>
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
