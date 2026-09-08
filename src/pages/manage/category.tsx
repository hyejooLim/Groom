import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCheck } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

import ManageLayout from '@/components/layouts/ManageLayout';
import CategoryManageList from '@/components/manage/CategoryManageList';
import { useGetCategories, useUpdateCategories } from '@/hooks/query/categories';
import { categoryJsonState } from '@/recoil/manage';
import Button from '@/components/common/Button';

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
      <span className='text-2xl'>카테고리 관리</span>
      <div className='mt-2 rounded-sm border border-[#e0e5ee] bg-white p-6'>
        <div className='mt-2 flex items-center justify-between'>
          <div>
            <p className='text-xl'>카테고리 순서를 변경하고 새로운 카테고리를 추가할 수 있습니다.</p>
            <p className='mt-1 text-md text-grey'>드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.</p>
          </div>
          <div className='float-right text-sm text-grey'>
            <span className='text-[#333]'>{categories?.length}</span> / 100
          </div>
        </div>
        <CategoryManageList categories={categories} />
        <div className='flex justify-end'>
          <Button
            disabled={isDisabled}
            className='flex py-3 px-8 text-lg items-center justify-center rounded-sm border border-solid border-[#333] bg-[#333] text-white shadow-sm hover:border-[#505050] hover:bg-[#505050] hover:shadow-md disabled:border-[#e0e5ee] disabled:bg-white disabled:text-[#959595]'
            onClick={handleCategoriesUpdate}
          >
            {isSave ? (
              <div className='flex items-center justify-center'>
                <p className='mr-1 inline-block'>저장 완료</p>
                <FiCheck />
              </div>
            ) : (
              '변경사항 저장'
            )}
          </Button>
        </div>
      </div>
      <div style={{ height: '100px' }} />
    </ManageLayout>
  );
};

export default ManageCategory;
