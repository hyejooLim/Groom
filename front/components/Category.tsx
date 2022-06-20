import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const CategoryWrapper = styled.div`
  padding: 20px 0 0 30px;
  display: flex;
  flex-direction: column;
  border-top: 1px dashed black;

  & li {
    color: #3b3e3f;
    font-size: 17px;
    margin-bottom: 13px;
  }
`;

const Category = () => {
  const [categories, setCategories] = useState([
    { name: 'Algorithm', number: 12, url: '/algorithm' },
    { name: 'React', number: 5, url: '/react' },
    { name: 'JavaScript', number: 24, url: '/javascript' },
    { name: 'TypeScript', number: 11, url: '/typescript' },
    { name: 'WebSocket', number: 2, url: '/websocket' },
    { name: 'HTML/CSS', number: 0, url: '/html_css' },
  ]);

  return (
    <CategoryWrapper>
      <span style={{ fontSize: '21px', fontWeight: 800, margin: '20px 0' }}>Category</span>
      <ul>
        {categories?.map((category, idx) => (
          // <Link href={category.url}>
          // <a>
          <li key={idx}>
            {category.name} ({category.number})
          </li>
          // </a>
          // </Link>
        ))}
      </ul>
    </CategoryWrapper>
  );
};

export default Category;
