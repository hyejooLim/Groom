import React, { ChangeEvent, KeyboardEvent } from 'react';
import Router from 'next/router';
import TextField from '@mui/material/TextField';
import { useSearchStore } from '@/stores/useSearchStore';

const Search = () => {
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);

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
    <div className='text-center mt-10'>
      <TextField
        className='input'
        type='text'
        variant='standard'
        sx={{ width: '177px' }}
        value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={handleKeyPress}
        placeholder='press enter to search…'
      />
    </div>
  );
};

export default Search;
