import React from 'react';
import Link from 'next/link';

import { CategoryItem } from '../../types';
import { useGetCategories } from '../../hooks/query/categories';
import { CategoryWrapper } from '../../styles/ts/components/main/Category';
import { getPublicAndPublishedPosts } from '../../utils/posts';

const Category = () => {
  const { data: categories } = useGetCategories();

  return (
    <CategoryWrapper>
      <span>카테고리</span>
      <ul>
        {categories?.map((category: CategoryItem) => (
          <li key={category.id}>
            <Link href={{ pathname: '/category/[name]', query: { id: category.id, name: category.name } }}>
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
