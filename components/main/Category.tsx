import React from 'react';
import Link from 'next/link';

import { CategoryItem } from '../../types';
import { useGetCategories } from '../../hooks/query/categories';
import { getPublicAndPublishedPosts } from '../../utils/posts';

const Category = () => {
  const { data: categories } = useGetCategories();

  return (
    <div className='flex flex-col border-dashed border-t border-grey pt-10 px-4'>
      <span className='text-xl font-bold text-dark'>카테고리</span>
      <ul className='mt-4 min-h-56'>
        {categories?.map(
          (category: CategoryItem) =>
            category.id !== 0 && (
              <li key={category.id} className='text-lg mb-2 text-light hover:text-a-hover'>
                <Link href={`/category/${category.name}`}>
                  {category.name} ({getPublicAndPublishedPosts(category.posts).length})
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Category;
