import React from 'react';
import Link from 'next/link';

import { CategoryItem, PostItem } from '../types';
import useGetCategories from '../hooks/query/useGetCategories';
import { CategoryWrapper } from '../styles/ts/components/Category';

const Category = () => {
  const { data: categories } = useGetCategories();

  return (
    <CategoryWrapper>
      <span>카테고리</span>
      <ul>
        {categories?.map((category: CategoryItem) => (
          <li key={category.id}>
            <Link href={`/category/${category.name}`}>
              <a className='category_item'>
                {category.name} ({category.posts?.filter((post: PostItem) => post.isPublic).length})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
