import React, { FC, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { Avatar, Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { FiSearch } from 'react-icons/fi';
import { BsCloudFill, BsArrowRight } from 'react-icons/bs';
import { BeatLoader } from 'react-spinners';

import { SharedPost } from '../../types';
import PaginationContainer from '../common/PaginationContainer';
import { useVisitSharedPost, useDeleteSharedPost } from '../../hooks/query/sharedPost';
import { firstIndexState, lastIndexState, currentPageState, MANAGE_PAGE_SIZE } from '../../recoil/manage';
import { EmptySearchBox, ListWrapper } from '../../styles/ts/components/manage/PostManageList';
import { NewIcon } from '../../styles/ts/common';
import * as S from '../../styles/ts/components/manage/SharedPostManageList';

interface SharedPostManageListProps {
  sharedPosts: SharedPost[];
  isLoading: boolean;
  isFetching: boolean;
  onClickCategory: (id: number) => void;
}

const SharedPostManageList: FC<SharedPostManageListProps> = ({
  sharedPosts,
  isLoading,
  isFetching,
  onClickCategory,
}) => {
  const router = useRouter();
  const visitSharedPost = useVisitSharedPost();
  const deleteSharedPost = useDeleteSharedPost();

  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const onInitPage = () => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(MANAGE_PAGE_SIZE);
  };

  useEffect(() => {
    onInitPage();
  }, [router.query]);

  const onClickTitle = useCallback((sharedPostId: number, isVisited: boolean) => {
    if (isVisited) {
      return;
    }

    visitSharedPost.mutate(sharedPostId);
  }, []);

  const onDeleteSharedPost = useCallback((sharedPostId: number) => {
    if (!confirm('해당 게시글을 공유 리스트에서 제거하시겠습니까?')) {
      return;
    }

    deleteSharedPost.mutate(sharedPostId);
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
    <>
      <ListWrapper>
        {isLoading || isFetching ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <>
            {sharedPosts?.length > 0 ? (
              sharedPosts?.slice(firstIndex, lastIndex).map((sharedPost) => (
                <S.PostInfo key={sharedPost.id}>
                  <div className='info_area'>
                    <div className='post_title'>
                      <Link href={`/post/${sharedPost.post?.id}`}>
                        <a onClick={() => onClickTitle(sharedPost.id, sharedPost.isVisited)}>
                          <span>{sharedPost.post?.title}</span>
                        </a>
                      </Link>
                      <PaperClipOutlined />
                      {!sharedPost.isVisited && <NewIcon>N</NewIcon>}
                    </div>
                    <div className='post_extra_info'>
                      <a onClick={() => onClickCategory(sharedPost.post?.categoryId)}>
                        <span>{sharedPost.post?.category?.name}</span>
                      </a>
                      <span>{sharedPost.post?.author.name}</span>
                      <span>{dayjs(sharedPost.post?.createdAt).format('YYYY.MM.DD HH:mm')}</span>
                    </div>
                  </div>
                  <S.SharerNames>
                    <div>
                      <Avatar
                        size={24}
                        icon={<BsCloudFill style={{ height: '24px', lineHeight: '24px' }} />}
                        src={sharedPost.sender.imageUrl}
                      />
                      <span className='sender name'>{sharedPost.sender.name}</span>
                    </div>
                    <BsArrowRight className='arrow_icon' />
                    <div>
                      <Avatar
                        size={24}
                        icon={<BsCloudFill style={{ height: '24px', lineHeight: '24px' }} />}
                        src={sharedPost.receiver.imageUrl}
                      />
                      <span className='receiver name'>{sharedPost.receiver.name}</span>
                    </div>
                  </S.SharerNames>
                  <S.ButtonWrapper>
                    <Button className='delete btn' onClick={() => onDeleteSharedPost(sharedPost.id)}>
                      공유 리스트에서 제거
                    </Button>
                  </S.ButtonWrapper>
                </S.PostInfo>
              ))
            ) : (
              <EmptySearchBox>
                <div className='icon_wrapper'>
                  <FiSearch className='icon' />
                </div>
                결과가 없습니다.
              </EmptySearchBox>
            )}
          </>
        )}
      </ListWrapper>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={sharedPosts?.length}
        onChange={onChangePage}
      />
    </>
  );
};

export default SharedPostManageList;
