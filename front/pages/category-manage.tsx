import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from 'antd';

import ManageLayout from '../components/layouts/ManageLayout';
import CategoryManageList, { CountTotal } from '../components/CategoryManageList';
import { categories } from '../components/Category';
import { CategoryItem } from '../types';

const ManageCategoryWrapper = styled.div`
  font-size: 14px;
  background: #fff;
  border-radius: 1px;
  border: 1px solid #e0e5ee;
  padding: 25px 29px 0;
  margin-top: 8px;

  .set_btn {
    margin: 0 -29px;
    padding: 14px 29px;
    border-top: 1px px solid #f1f3f6;
    background: #fafbfc;
    display: flex;
    justify-content: flex-end;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .desc_text {
    line-height: 60%;

    .info {
      font-size: 13px;
      color: #808080;
    }
  }
`;

const SaveDiffButton = styled(Button)`
  width: 140px;
  height: 38px;
  border: 1px solid #333;

  &:not(:enabled) {
    background-color: #fff;
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;

    :hover {
      background-color: #fff;
      border-color: #e0e5ee;
      color: #959595;
      box-shadow: none;
    }
  }

  &:enabled {
    color: #fff;
    background: #333;
    border-radius: 1px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #505050;
      background: #505050;
      box-shadow: 0 2px 5px rgb(0 0 0 / 23%);
    }
  }
`;

const CategoryManage = () => {
  const [newCategories, setNewCategories] = useState<CategoryItem[]>(categories);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(JSON.stringify(categories) === JSON.stringify(newCategories));
  }, [categories, newCategories]);

  const onUpdateCategories = useCallback(() => {
    if (categories === newCategories) {
      alert('변경사항이 없습니다.');
      return;
    }

    // 카테고리 수정 api 요청
    // const response = await axios.patch('/category/update', newCategories);
    // setCategorise(response);
    setIsDisabled(true);
  }, [categories, newCategories]);

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 카테고리 관리</title>
      </Head>
      <span style={{ fontSize: '18px' }}>카테고리 관리</span>
      <ManageCategoryWrapper>
        <Description>
          <div className='desc_text'>
            <p className='title'>카테고리 순서를 변경하고 새로운 카테고리를 추가할 수 있습니다.</p>
            <p className='info'>드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.</p>
          </div>
          <CountTotal>
            <span style={{ color: '#333' }}>{newCategories.length}</span> / 12
          </CountTotal>
        </Description>
        <CategoryManageList categories={newCategories} setCategories={setNewCategories} />
        <div className='set_btn'>
          <SaveDiffButton onClick={onUpdateCategories} disabled={isDisabled}>
            변경사항 저장
          </SaveDiffButton>
        </div>
      </ManageCategoryWrapper>
    </ManageLayout>
  );
};

export default CategoryManage;
