import React, { FC, useState, useEffect, useCallback, MouseEvent } from 'react';
import Router from 'next/router';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { GrSearch } from 'react-icons/gr';
import classNames from 'classnames';

import useInput from '../../hooks/common/input';
import * as S from '../../styles/ts/components/manage/SearchInput';

interface SearchInputProps {
  placeholder: string;
}

const searchTypeList = [
  {
    key: 'TITLE',
    label: '제목',
  },
  {
    key: 'CONTENT',
    label: '내용',
  },
  {
    key: 'TAG',
    label: '태그',
  },
];

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  const [openMenu, setOpenMenu] = useState(false);
  const [searchType, setSearchType] = useState(searchTypeList[0]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (!showInput) {
      setKeyword('');
      setSearchType(searchTypeList[0]);
    }
  }, [showInput]);

  const onClickLabel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSearchType({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  }, []);

  const onSubmitInput = useCallback(() => {
    setShowInput(false);

    placeholder === '글'
      ? Router.push(`/manage/posts/${keyword}/${searchType.label}`)
      : Router.push(`/manage/subscribedPosts/${keyword}/${searchType.label}`);
  }, [placeholder, keyword, searchType]);

  const onClickCloseButton = () => {
    setShowInput(false);
    setOpenMenu(false);
  };

  const menu = (
    <S.OverrideMenu
      selectable
      defaultSelectedKeys={['TITLE']}
      items={searchTypeList.map((item) => {
        return {
          key: item.key,
          label: (
            <button data-key={item.key} data-label={item.label} onClick={onClickLabel}>
              {item.label}
            </button>
          ),
        };
      })}
    />
  );

  return (
    <S.FormWrapper className={classNames({ on: showInput })}>
      <S.StyledForm onFinish={onSubmitInput}>
        <S.InnerWrapper>
          {showInput && (
            <>
              <S.DropdownWrapper>
                <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: '100px' }}>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenu((prev) => !prev);
                    }}
                  >
                    <span style={{ fontSize: '14px', margin: '0 24px 0 -10px' }}>{searchType.label}</span>
                    {openMenu ? (
                      <UpOutlined style={{ fontSize: '12px' }} />
                    ) : (
                      <DownOutlined style={{ fontSize: '12px' }} />
                    )}
                  </span>
                </Dropdown>
              </S.DropdownWrapper>
              <S.StyledInput
                type='text'
                value={keyword}
                onChange={onChangeKeyword}
                placeholder={placeholder + '에서 검색합니다.'}
              />
              <S.SearchButton htmlType='submit' disabled={!keyword || !keyword.trim()}>
                <GrSearch />
              </S.SearchButton>
              <S.CloseButton onClick={onClickCloseButton}>닫기</S.CloseButton>
            </>
          )}
          {!showInput && (
            <S.ShowInputButton onClick={() => setShowInput(true)}>
              <span>검색</span>
              <GrSearch className='icon' />
            </S.ShowInputButton>
          )}
        </S.InnerWrapper>
      </S.StyledForm>
    </S.FormWrapper>
  );
};

export default SearchInput;
