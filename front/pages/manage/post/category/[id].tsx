import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { CloseCircleOutlined } from '@ant-design/icons';

import { MANAGE_PAGE_SIZE } from '../../../../recoil/page';
import ManageLayout from '../../../../components/layouts/ManageLayout';
import SearchInput from '../../../../components/manage/SearchInput';
import PostManageList from '../../../../components/manage/PostManageList';
import PaginationContainer from '../../../../components/common/PaginationContainer';
import { useSearchPostsIncludeCategory } from '../../../../hooks/query/search';
import { CloseButton, TitleWrapper } from '../../../../styles/ts/common';

const ManagePostSearchCategory = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const { data: posts } = useSearchPostsIncludeCategory(Number(id));

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
        <title>Groom | 글 관리 '{name}' 카테고리의 글 목록</title>
      </Head>
      <div>
        <TitleWrapper>
          <div>
            <Link href='/manage/post'>
              <a>
                <CloseButton>
                  <CloseCircleOutlined />
                </CloseButton>
              </a>
            </Link>
            <span className='text title'>'{name}'</span>
            <span className='text'>글</span>
            <span className='count'>{posts?.length}</span>
          </div>
        </TitleWrapper>
        <SearchInput placeholder='글' />
        <PostManageList posts={posts} firstIndex={firstIndex} lastIndex={lastIndex} />
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

export default ManagePostSearchCategory;
