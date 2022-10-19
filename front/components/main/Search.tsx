import React, { KeyboardEvent } from 'react';
import Router from 'next/router';
import { Input } from 'antd';

import useInput from '../../hooks/common/input';
import { SearchWrapper } from '../../styles/ts/components/main/Search';

const Search = () => {
  const [keyword, onChangeKeyword] = useInput('');

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
