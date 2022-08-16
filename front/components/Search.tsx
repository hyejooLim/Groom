import React, { KeyboardEvent } from 'react';
import Router from 'next/router';
import { Input } from 'antd';

import useInput from '../hooks/input';
import { SearchWrapper } from '../styles/ts/components/Search';
import { mainPosts } from '../pages';

const Search = () => {
  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (keyword === '' || !keyword.trim()) {
      return;
    }

    if (e.key === 'Enter') {
      const targetPosts = mainPosts.filter((post) => {
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
