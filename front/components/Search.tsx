import React, { KeyboardEvent } from 'react';
import Router from 'next/router';
import { Input } from 'antd';

import useInput from '../hooks/common/input';
import useGetPosts from '../hooks/query/useGetPosts';
import { SearchWrapper } from '../styles/ts/components/Search';
import { PostItem } from '../types';

const Search = () => {
  const { data: posts } = useGetPosts();
  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (keyword === '' || !keyword.trim()) {
      return;
    }

    const keywordRegex = new RegExp(keyword, 'gi');

    const filteredPosts = posts?.filter((post: PostItem) => {
      const { title, category, content, author, tags } = post;

      return (
        keywordRegex.test(category.name) ||
        keywordRegex.test(title) ||
        keywordRegex.test(content) ||
        keywordRegex.test(author.name) ||
        tags?.find((tag) => tag.name === keyword)
      );
    });

    Router.push(
      { pathname: `/search/${keyword}`, query: { targetPosts: JSON.stringify(filteredPosts) } },
      `/search/${keyword}`
    );
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
