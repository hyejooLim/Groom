import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../../../components/layouts/ManageLayout';
import SearchInput from '../../../../components/manage/SearchInput';
import PostManageList from '../../../../components/manage/PostManageList';
import PaginationContainer from '../../../../components/common/PaginationContainer';
import { useSearchUserSubscribedPosts } from '../../../../hooks/query/search';
import { MANAGE_PAGE_SIZE } from '../../../../recoil/page';
import { CloseButton, TitleWrapper } from '../../../../styles/ts/common';

const SearchManageSubscribedPosts = () => {
  const router = useRouter();
  const { keyword, searchType } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const { data: posts } = useSearchUserSubscribedPosts(keyword as string, searchType as string);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  const onSearchInput = (keyword: string, searchType: string) => {
    Router.push(`/manage/subscribedPosts/${keyword}/${searchType}`);
  };

  const onClickCategory = (id: number, name: string) => {
    Router.push(
      { pathname: `/manage/subscribedPosts/category/${id}`, query: { name } },
      `/manage/subscribedPosts/category/${id}`
    );
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리 '{keyword}'의 검색결과</title>
      </Head>
      <div>
        <TitleWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href='/manage/subscribedPosts'>
              <a>
                <CloseButton>
                  <CloseCircleOutlined />
                </CloseButton>
              </a>
            </Link>
            <span className='text title'>'{keyword}'</span>
            <span className='text'>검색결과</span>
            <span className='count'>{posts?.length}</span>
          </div>
        </TitleWrapper>
        <SearchInput placeholder='구독 글' onSearch={onSearchInput} />
        <PostManageList posts={posts} firstIndex={firstIndex} lastIndex={lastIndex} onClickCategory={onClickCategory} />
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={posts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default SearchManageSubscribedPosts;
