import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../../../components/layouts/ManageLayout';
import SearchInput from '../../../../components/manage/SearchInput';
import PostManageList from '../../../../components/manage/PostManageList';
import PaginationContainer from '../../../../components/common/PaginationContainer';
import { useSearchPosts } from '../../../../hooks/query/search';
import { MANAGE_PAGE_SIZE } from '../../../../recoil/page';
import { CloseButton, TitleWrapper } from '../../../../styles/ts/common';

const ManagePostSearch = () => {
  const router = useRouter();
  const { keyword, searchType } = router.query;

  const [currnetPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const { data: posts } = useSearchPosts(keyword as string, searchType as string);

  const onChangePostList = useCallback((e) => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(MANAGE_PAGE_SIZE);

    // 수정 필요
  }, []);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리 '{keyword}'의 검색결과</title>
      </Head>
      <div>
        <TitleWrapper>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href='/manage/post'>
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
        <SearchInput placeholder='글' />
        <PostManageList
          posts={posts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onChangePostList={onChangePostList}
        />
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currnetPage}
        total={posts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManagePostSearch;
