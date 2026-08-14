import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import ManageLayout from '../../components/layouts/ManageLayout';
import NeighborManageList from '../../components/manage/NeighborManageList';
import SearchInput from '../../components/common/SearchInput';
import useGetNeighbors from '../../hooks/query/neighbors';
import { useSearchNeighbors } from '../../hooks/query/search';

const ManageNeighbors = () => {
  const router = useRouter();
  const { searchKeyword } = router.query;

  const { data: neighbors, isFetching: isFetchingNeighbors } = useGetNeighbors();
  const { data: searchNeighbors, isFetching: isFetchingSearch } = useSearchNeighbors(String(searchKeyword));

  const onSearchInput = (searchKeyword: string) => {
    Router.push({
      pathname: '/manage/neighbors',
      query: {
        searchKeyword,
      },
    });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 이웃 관리</title>
        {searchKeyword && <title>Groom | 이웃 관리 '{searchKeyword}'의 검색결과</title>}
      </Head>
      <div className='-mt-5'>
        <div className='flex items-center'>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text-2xl'>이웃 관리</span>
              <span className='ml-2 text-gray-400'>{neighbors?.length}</span>
            </>
          ) : (
            <div className='flex items-center'>
              <Link href='/manage/neighbors'>
                <Button
                  sx={{
                    padding: 0,
                    color: '#2b2b2b',
                    minWidth: 'auto',
                  }}
                >
                  <CancelOutlinedIcon />
                </Button>
              </Link>
              {searchKeyword && (
                <>
                  <span className='text-2xl mx-2 text-red-500'>'{searchKeyword}'</span>
                  <span className='text-2xl'>검색결과</span>
                  <span className='ml-2 text-gray-400'>{searchNeighbors?.length}</span>
                </>
              )}
            </div>
          )}
        </div>
        <SearchInput placeholder='이름 또는 이메일을 입력해 주세요.' onSearch={onSearchInput} />
        <NeighborManageList
          neighbors={searchNeighbors ?? neighbors}
          isFetching={isFetchingSearch || isFetchingNeighbors}
        />
      </div>
    </ManageLayout>
  );
};

export default ManageNeighbors;
