import React, { ChangeEvent, KeyboardEvent } from 'react';
import Router from 'next/router';
import { useRecoilState } from 'recoil';
import { Input } from 'antd';

import { keywordState } from '../../recoil/main';
import { SearchWrapper } from '../../styles/ts/components/main/Search';

const Search = () => {
  const [keyword, setKeyword] = useRecoilState(keywordState);

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (keyword === '' || !keyword.trim()) {
      return;
    }

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
