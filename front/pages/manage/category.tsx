import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { FiCheck } from 'react-icons/fi';

import ManageLayout from '../../components/layouts/ManageLayout';
import CategoryManageList from '../../components/manage/CategoryManageList';
import { useGetCategories, useUpdateCategories } from '../../hooks/query/categories';
import getUser from '../../apis/user/getUser';
import getCategories from '../../apis/categories/getCategories';
import { CategoryJson } from '../../types';
import * as S from '../../styles/ts/pages/manage/category';

const ManageCategory = () => {
  const { data: categories } = useGetCategories();
  const updateCategories = useUpdateCategories();

  const [isSave, setIsSave] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryJson, setCategoryJson] = useState<CategoryJson>({ append: [], update: [], delete: [] });

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

  const onUpdateCategories = useCallback(() => {
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
        <CategoryManageList categories={categories} categoryJson={categoryJson} setCategoryJson={setCategoryJson} />
        <div className='set_btn'>
          <S.SaveDiffButton onClick={onUpdateCategories} disabled={isDisabled}>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ManageCategory;
