import React from 'react';
import Link from 'next/link';

import { CategoryItem } from '../../types';
import { useGetCategories } from '../../hooks/query/categories';
import { CategoryWrapper } from '../../styles/ts/components/Category';
import { getPublicAndPublishedPosts } from '../../lib/posts';

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
                {category.name} ({getPublicAndPublishedPosts(category.posts).length})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
