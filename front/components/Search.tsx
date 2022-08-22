import React, { KeyboardEvent } from 'react';
import Router from 'next/router';
import { Input } from 'antd';

import useInput from '../hooks/common/input';
import { SearchWrapper } from '../styles/ts/components/Search';
import useGetPosts from '../hooks/query/useGetPosts';

const Search = () => {
  const { data: posts } = useGetPosts();
  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword === '' || !keyword.trim()) {
      return;
    }

    if (e.key === 'Enter') {
      const targetPosts = posts.filter((post) => {
        const { title, category, content, author } = post;
        const insentiveKeyword = new RegExp(keyword, 'gi');

        return (
          insentiveKeyword.test(category.name) ||
          insentiveKeyword.test(title) ||
          insentiveKeyword.test(content) ||
          insentiveKeyword.test(author?.name)
        );
      });

      Router.push(
        {
          pathname: '/',
          query: {
            keyword,
            targetPosts: JSON.stringify(targetPosts),
          },
        },
        `/keyword=${keyword}`
      );
    }
  };

  return (
    <SearchWrapper>
      <Input
        className='input'
        type='text'
        value={keyword}
        onChange={onChangeKeyword}
        placeholder='press enter to search…'
        onKeyPress={handleKeyPress}
      />
    </SearchWrapper>
  );
};

export default Search;
