import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import NeighborManageList from '../../components/manage/NeighborManageList';
import SearchInput from '../../components/common/SearchInput';
import useGetNeighbors from '../../hooks/query/neighbors';
import { useSearchNeighbors } from '../../hooks/query/search';
import { CloseButton, TitleWrapper } from '../../styles/ts/common';

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
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text'>이웃 관리</span>
              <span className='count'>{neighbors?.length}</span>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/manage/neighbors'>
                <a>
                  <CloseButton>
                    <CloseCircleOutlined />
                  </CloseButton>
                </a>
              </Link>
              {searchKeyword && (
                <>
                  <span className='text title'>'{searchKeyword}'</span>
                  <span className='text'>검색결과</span>
                  <span className='count'>{searchNeighbors?.length}</span>
                </>
              )}
            </div>
          )}
        </TitleWrapper>
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
