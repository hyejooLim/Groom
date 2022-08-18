import React from 'react';
import Link from 'next/link';

import { CategoryItem } from '../types';
import { CategoryWrapper } from '../styles/ts/components/Category';

// dummy data
export const categories: CategoryItem[] = [
  {
    id: 1,
    name: 'algorithm',
    posts: [],
  },
  {
    id: 2,
    name: 'typescript',
    posts: [],
  },
  {
    id: 3,
    name: 'react',
    posts: [],
  },
  {
    id: 4,
    name: 'next',
    posts: [],
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
                {category.name} ({category.posts?.length})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
