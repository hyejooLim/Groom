import React, { FC, useState, useEffect, useCallback, MouseEvent } from 'react';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { GrSearch } from 'react-icons/gr';
import classNames from 'classnames';

import useInput from '../../hooks/common/input';
import * as S from '../../styles/ts/components/manage/WrapSearchInput';

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

  const onClickLabel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSearchType({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  }, []);

  const onSubmitInput = useCallback(() => {
    setShowInput(false);
    onSearch(searchKeyword, searchType.key);
  }, [searchKeyword, searchType]);

  const onClickCloseButton = () => {
    setShowInput(false);
    setOpenMenu(false);
  };

  const menu = (
    <S.OverrideMenu
      selectable
      defaultSelectedKeys={['title']}
      items={totalSearchType.map((item) => {
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
                      e.stopPropagation();
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
                value={searchKeyword}
                onChange={onChangeSearchKeyword}
                placeholder={placeholder + '에서 검색합니다.'}
              />
              <S.SearchButton htmlType='submit' disabled={!searchKeyword || !searchKeyword.trim()}>
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

export default WrapSearchInput;
