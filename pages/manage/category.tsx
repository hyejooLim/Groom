import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCheck } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

import ManageLayout from '../../components/layouts/ManageLayout';
import CategoryManageList from '../../components/manage/CategoryManageList';
import { useGetCategories, useUpdateCategories } from '../../hooks/query/categories';
import { categoryJsonState } from '../../recoil/manage';
import * as S from '../../styles/ts/pages/manage/category';

const ManageCategory = () => {
  const { data: categories } = useGetCategories();
  const updateCategories = useUpdateCategories();

  const [isSave, setIsSave] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryJson, setCategoryJson] = useRecoilState(categoryJsonState);

  useEffect(() => {
    if (categoryJson.append.length === 0 && categoryJson.update.length === 0 && categoryJson.delete.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setIsSave(false);
    }
  }, [categoryJson]);

  useEffect(() => {
    if (updateCategories.isSuccess) {
      setIsSave(true);
      setCategoryJson({ append: [], update: [], delete: [] });
    }
  }, [updateCategories.isSuccess]);

  const handleCategoriesUpdate = useCallback(() => {
    updateCategories.mutate({ data: categoryJson });
  }, [categoryJson]);

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 카테고리 관리</title>
      </Head>
      <span style={{ fontSize: '20px' }}>카테고리 관리</span>
      <S.ManageCategoryWrapper>
        <S.Description>
          <div className='desc_text'>
            <p className='title'>카테고리 순서를 변경하고 새로운 카테고리를 추가할 수 있습니다.</p>
            <p className='info'>드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.</p>
          </div>
          <S.TotalCount>
            <span>{categories?.length}</span> / 100
          </S.TotalCount>
        </S.Description>
        <CategoryManageList categories={categories} />
        <div className='set_btn'>
          <S.SaveDiffButton onClick={handleCategoriesUpdate} disabled={isDisabled}>
            {isSave ? (
              <div className='checkBox'>
                <p>저장 완료</p>
                <FiCheck />
              </div>
            ) : (
              '변경사항 저장'
            )}
          </S.SaveDiffButton>
        </div>
      </S.ManageCategoryWrapper>
      <div style={{ height: '100px' }} />
    </ManageLayout>
  );
};

export default ManageCategory;
