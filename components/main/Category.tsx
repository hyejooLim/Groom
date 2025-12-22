import React from "react";
import Link from "next/link";

import { CategoryItem } from "../../types";
import { useGetCategories } from "../../hooks/query/categories";
import { CategoryWrapper } from "../../styles/ts/components/main/Category";
import { getPublicAndPublishedPosts } from "../../utils/posts";

const Category = () => {
  const { data: categories } = useGetCategories();

  return (
    <CategoryWrapper>
      <span>카테고리</span>
      <ul>
        {categories?.map(
          (category: CategoryItem) =>
            category.id !== 0 && (
              <li key={category.id}>
                <Link
                  href={`/category/${category.name}`}
                  className="category_item"
                >
                  {category.name} (
                  {getPublicAndPublishedPosts(category.posts).length})
                </Link>
              </li>
            )
        )}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
