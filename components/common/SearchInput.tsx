import React, { FC, useState, ChangeEvent, useEffect, SubmitEvent } from 'react';
import { useRouter } from 'next/router';
import { GrSearch } from 'react-icons/gr';
import { Box, TextField } from '@mui/material';
import Button from './Button';

interface SearchInputProps {
  placeholder: string;
  onSearch: (keyword: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setKeyword('');
      return;
    }

    setKeyword(router.query.searchKeyword as string);
  }, [router.query]);

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmitForm = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <Box component='form' onSubmit={onSubmitForm} className='flex items-center justify-between mt-4'>
      <TextField
        type='text'
        value={keyword}
        onChange={onChangeKeyword}
        placeholder={placeholder}
        className='flex-grow'
        sx={{
          '& .MuiInputBase-root': {
            height: '50px',
            fontSize: '17px',
            borderRadius: '2px',
          },
        }}
      />
      <Button
        type='submit'
        disabled={!keyword}
        className='ml-4 flex items-center gap-x-2 bg-dark-grey px-5 py-4 transition-colors duration-200 hover:bg-dark-grey/80 cursor-pointer rounded-md text-white disabled:bg-grey disabled:cursor-not-allowed'
      >
        <span>검색</span>
        <GrSearch className='icon' />
      </Button>
    </Box>
  );
};

export default SearchInput;
