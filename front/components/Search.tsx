import React, { KeyboardEvent } from 'react';
import Router from 'next/router';
import { Input } from 'antd';

import useInput from '../hooks/common/input';
import useGetPosts from '../hooks/query/useGetPosts';
import useGetTags from '../hooks/query/useGetTags';
import { SearchWrapper } from '../styles/ts/components/Search';
import { PostItem, TagItem } from '../types';

const Search = () => {
  const { data: posts } = useGetPosts();
  const { data: tags } = useGetTags();

  const [keyword, onChangeKeyword] = useInput('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (keyword === '' || !keyword.trim()) {
      return;
    }

    const targetPosts: PostItem[] = [];

    const filteredPosts = posts?.filter((post: PostItem) => {
      const { title, category, content, author } = post;
      const keywordRegex = new RegExp(keyword, 'gi');

      return (
        keywordRegex.test(category.name) ||
        keywordRegex.test(title) ||
        keywordRegex.test(content) ||
        keywordRegex.test(author.name)
      );
    });
    filteredPosts && targetPosts.push(...filteredPosts);

    const matchedTag = tags?.find((tag: TagItem) => tag.name === keyword);
    matchedTag && targetPosts.push(...matchedTag.posts);

    Router.push(
      { pathname: `/search/${keyword}`, query: { targetPosts: JSON.stringify(targetPosts) } },
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
