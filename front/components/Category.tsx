import React from 'react';
import Link from 'next/link';

import useGetCategories from '../hooks/query/useGetCategories';
import { CategoryWrapper } from '../styles/ts/components/Category';

const Category = () => {
  const { data: categories } = useGetCategories();

  return (
    <CategoryWrapper>
      <span style={{ fontSize: '18px', fontWeight: 600, margin: '20px 0 30px 0' }}>카테고리</span>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.name}`}>
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
