import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';

import ManageLayout from '../../components/layouts/ManageLayout';
import CategoryManageList from '../../components/CategoryManageList';
import useGetCategories from '../../hooks/query/useGetCategories';
import { categoriesState } from '../../recoil/categories';
import updateCategories from '../../apis/updateCategories';
import { CategoryJson } from '../../types';
import { ManageCategoryWrapper, Description, SaveDiffButton, TotalCount } from '../../styles/ts/pages/manage/category';

const ManageCategory = () => {
  const { refetch } = useGetCategories();
  const categories = useRecoilValue(categoriesState);

  const [categoryJson, setCategoryJson] = useState<CategoryJson>({ append: [], update: [], delete: [] });

  const [isSave, setIsSave] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(
      categoryJson.append.length === 0 && categoryJson.update.length === 0 && categoryJson.delete.length === 0
    );
  }, [categoryJson]);

  const onUpdateCategories = useCallback(async () => {
    try {
      const result = await updateCategories({ data: categoryJson });

      if (result.ok) {
        refetch();

        setIsSave(true);
        setCategoryJson({ append: [], update: [], delete: [] });
      }
    } catch (err) {
      console.error(err);
    }
  }, [categoryJson]);

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
            <span>{categories?.length}</span> / 12
          </TotalCount>
        </Description>
        <CategoryManageList categoryJson={categoryJson} setCategoryJson={setCategoryJson} />
        <div className='set_btn'>
          <SaveDiffButton onClick={onUpdateCategories} disabled={isDisabled}>
            {isSave ? '저장 완료' : '변경사항 저장'}
          </SaveDiffButton>
        </div>
      </ManageCategoryWrapper>
    </ManageLayout>
  );
};

export default ManageCategory;
