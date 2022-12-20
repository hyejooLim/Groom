import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GrSearch } from 'react-icons/gr';

import * as S from '../../styles/ts/components/common/SearchInput';

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

  const onSubmitForm = () => {
    onSearch(keyword);
  };

  return (
    <S.SearchInputWrapper>
      <S.StyledForm onFinish={onSubmitForm}>
        <S.StyledInput type='text' value={keyword} onChange={onChangeKeyword} placeholder={placeholder} />
        <S.SubmitButton htmlType='submit' disabled={!keyword}>
          <span>검색</span>
          <GrSearch className='icon' />
        </S.SubmitButton>
      </S.StyledForm>
    </S.SearchInputWrapper>
  );
};

export default SearchInput;
