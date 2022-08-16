import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';

import ManageLayout from '../../components/layouts/ManageLayout';
import CategoryManageList from '../../components/CategoryManageList';
import { categories } from '../../components/Category';
import { CategoryItem } from '../../types';
import { ManageCategoryWrapper, Description, SaveDiffButton, TotalCount } from '../../styles/ts/pages/manage/category';

const ManageCategory = () => {
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
          <TotalCount>
            <span>{newCategories.length}</span> / 12
          </TotalCount>
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

export default ManageCategory;
