import React, { KeyboardEvent, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Input } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useInput from '../../hooks/common/input';
import { mainPostsState, searchPostsState } from '../../recoil/posts';
import { PostItem } from '../../types';
import useGetPosts from '../../hooks/query/useGetPosts';
import { SearchWrapper } from '../../styles/ts/components/Search';

const Search = () => {
  const { data } = useGetPosts();
  const mainPosts = useRecoilValue(mainPostsState);
  const setSearchPosts = useSetRecoilState(searchPostsState);

  const router = useRouter();
  const [keyword, onChangeKeyword] = useInput('');

  const filterPosts = (value: string) => {
    const keywordRegex = new RegExp(value, 'gi');

    const filteredPosts = mainPosts?.filter((post: PostItem) => {
      const { title, category, content, author, tags } = post;

      return (
        keywordRegex.test(category.name) ||
        keywordRegex.test(title) ||
        keywordRegex.test(content) ||
        keywordRegex.test(author.name) ||
        tags?.find((tag) => tag.name === value)
      );
    });

    setSearchPosts(filteredPosts);
  };

  // 첫 렌더링 시, 처음 키워드 검색 시 실행
  useEffect(() => {
    const { keyword } = router.query;
    keyword && filterPosts(keyword as string);
  }, [router.query && mainPosts]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (keyword === '' || !keyword.trim()) {
      return;
    }

    filterPosts(keyword);
    Router.push(`/search/${keyword}`);
  };

  return (
    <SearchWrapper>
      <Input
        className='input'
        type='text'
        value={keyword}
        onChange={onChangeKeyword}
        onKeyPress={handleKeyPress}
        placeholder='press enter to search…'
      />
    </SearchWrapper>
  );
};

export default Search;
