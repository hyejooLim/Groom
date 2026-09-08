import React, { FC, useState, useEffect, useCallback } from 'react';
import { GrSearch } from 'react-icons/gr';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Box, Button, FormControl, InputBase, MenuItem, Select } from '@mui/material';

import useInput from '@/hooks/common/input';

interface WrapSearchInputProps {
  placeholder: string;
  newSearchTypes?: [{ key: string; label: string }];
  onSearch: (searchKeyword: string, searchType: string) => void;
}

const searchTypeList = [
  {
    key: 'title',
    label: '제목',
  },
  {
    key: 'content',
    label: '내용',
  },
  {
    key: 'tag',
    label: '태그',
  },
];

const WrapSearchInput: FC<WrapSearchInputProps> = ({ placeholder, newSearchTypes, onSearch }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchType, setSearchType] = useState(searchTypeList[0]);
  const [searchKeyword, onChangeSearchKeyword, setSearchKeyword] = useInput('');

  const totalSearchType = newSearchTypes ? searchTypeList.concat(newSearchTypes) : searchTypeList;

  useEffect(() => {
    function onClick() {
      if (showInput) {
        setOpenMenu(false);
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [showInput]);

  useEffect(() => {
    if (!showInput) {
      setSearchKeyword('');
      setSearchType(searchTypeList[0]);
    }
  }, [showInput]);

  const onSubmitInput = useCallback(() => {
    setShowInput(false);
    onSearch(searchKeyword, searchType.key);
  }, [searchKeyword, searchType]);

  const onClickCloseButton = () => {
    setShowInput(false);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (!searchType && totalSearchType?.length > 0) {
      setSearchType(totalSearchType[0]);
    }
  }, [totalSearchType, searchType, setSearchType]);

  const menuItems = totalSearchType.map((item) => (
    <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}>
      {item.label}
    </MenuItem>
  ));

  return (
    <Box
      className={`
    w-full h-[58px] mt-[10px] rounded-[1px] transition-colors duration-200
    ${showInput ? 'border border-[#475466] bg-white' : 'border border-[#e0e5ee] bg-[#fafbfd]'}
  `}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitInput();
        }}
        className='flex items-center h-full w-full'
      >
        <Box className={`flex items-center h-full w-full ${!showInput ? 'justify-end' : ''}`}>
          {showInput ? (
            <>
              <Box className='flex items-center w-full '>
                <Box className='w-[100px] ml-[46px] mr-[18px] border-r border-[#e0e5ee] flex items-center cursor-pointer'>
                  <FormControl variant='standard' fullWidth>
                    <Select
                      value={searchType?.key || totalSearchType[0]?.key || ''}
                      onOpen={() => setOpenMenu(true)}
                      onClose={() => setOpenMenu(false)}
                      onChange={(e) => {
                        const selectedKey = e.target.value;
                        const selectedItem = totalSearchType.find((item) => item.key === selectedKey);
                        if (selectedItem) setSearchType(selectedItem);
                      }}
                      IconComponent={() =>
                        openMenu ? (
                          <MdKeyboardArrowUp className='!text-[12px] mr-2' />
                        ) : (
                          <MdKeyboardArrowDown className='!text-[12px] mr-2' />
                        )
                      }
                      sx={{
                        fontSize: '14px',
                        '& .MuiSelect-select': {
                          paddingRight: '24px !important',
                          display: 'flex',
                          alignItems: 'center',
                        },
                        '&:before, &:after': { display: 'none' },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            '& .MuiMenuItem-root.Mui-selected': { color: '#ff5544', bgcolor: 'transparent' },
                            '& .MuiMenuItem-root:hover': { bgcolor: '#f5f5f5', color: '#ff5544' },
                          },
                        },
                      }}
                    >
                      {menuItems}
                    </Select>
                  </FormControl>
                </Box>

                <InputBase
                  className='flex-grow text-[18px] !bg-transparent'
                  value={searchKeyword}
                  onChange={onChangeSearchKeyword}
                  placeholder={`${placeholder}에서 검색합니다.`}
                  sx={{ width: '640px' }}
                />
                <Button
                  type='submit'
                  disabled={!searchKeyword || !searchKeyword.trim()}
                  className='!min-w-fit !mr-6 !p-0 relative !text-[18px] !bg-transparent !text-[#333] disabled:!opacity-50'
                >
                  <GrSearch />
                </Button>
                <Button
                  onClick={onClickCloseButton}
                  className='!text-grey !text-lg !bg-transparent hover:!bg-transparent !p-0 !mr-6'
                >
                  닫기
                </Button>
              </Box>
            </>
          ) : (
            <Button
              onClick={() => setShowInput(true)}
              className='!mr-6 !text-[16px] !text-[#333] !bg-transparent flex items-center capitalize'
            >
              <GrSearch className='ml-[10px]' />
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default WrapSearchInput;
