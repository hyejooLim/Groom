import React, { FC, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Box, Avatar, Button } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import { FiSearch } from 'react-icons/fi';
import { BeatLoader } from 'react-spinners';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { SharedPost } from '@/@types/types';
import PaginationContainer from '../common/PaginationContainer';
import { useVisitSharedPost, useDeleteSharedPost } from '@/hooks/query/sharedPost';
import { MANAGE_PAGE_SIZE, useManageStore } from '@/stores/useManageStore';

interface SharedPostManageListProps {
  sharedPosts: SharedPost[];
  isLoading?: boolean;
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

  const firstIndex = useManageStore((state) => state.firstIndex);
  const setFirstIndex = useManageStore((state) => state.setFirstIndex);

  const lastIndex = useManageStore((state) => state.lastIndex);
  const setLastIndex = useManageStore((state) => state.setLastIndex);

  const currentPage = useManageStore((state) => state.currentPage);
  const setCurrentPage = useManageStore((state) => state.setCurrentPage);

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
    [MANAGE_PAGE_SIZE],
  );

  return (
    <>
      <Box className='mt-2 bg-white min-h-[383px] border border-[#e0e5ee] break-all leading-[1.8]'>
        {isLoading || isFetching ? (
          <Box className='text-center leading-[383px]'>
            <BeatLoader className='loader' color='#ddd' size={16} />
          </Box>
        ) : (
          <>
            {sharedPosts?.length > 0 ? (
              sharedPosts?.slice(firstIndex, lastIndex).map((sharedPost) => (
                <Box
                  key={sharedPost.id}
                  className='group relative flex items-center border-b border-[#f1f3f6] px-4 py-3 text-sm hover:bg-[#fafbfd]'
                >
                  <div className='w-[480px]'>
                    <div className='flex items-center mb-1'>
                      <Link
                        href={`/post/${sharedPost.post?.id}`}
                        onClick={() => onClickTitle(sharedPost.id, sharedPost.isVisited)}
                        className='mr-1 text-[16px] hover:cursor-pointer hover:underline hover:text-inherit'
                      >
                        <span>{sharedPost.post?.title}</span>
                      </Link>
                      <AttachFileOutlinedIcon fontSize='small' />
                      {!sharedPost.isVisited && (
                        <span className='!ml-2 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-sm font-bold'>
                          N
                        </span>
                      )}
                    </div>
                    <Box>
                      <a className='text-error' onClick={() => onClickCategory(sharedPost.post?.categoryId)}>
                        <span>{sharedPost.post?.category?.name}</span>
                      </a>
                      <span className='mx-1 text-grey'>•</span>
                      <span className='text-dark'>{sharedPost.post?.author.name}</span>
                      <span className='mx-1 text-grey'>•</span>
                      <span className='text-dark'>{dayjs(sharedPost.post?.createdAt).format('YYYY.MM.DD HH:mm')}</span>
                    </Box>
                  </div>

                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      <Avatar sx={{ width: 24, height: 24 }} src={sharedPost.sender.imageUrl}>
                        <CloudIcon sx={{ fontSize: 14 }} />
                      </Avatar>
                      <span className='ml-1 text-dark'>{sharedPost.sender.name}</span>
                    </div>
                    <ArrowRightOutlinedIcon />
                    <div className='flex items-center'>
                      <Avatar sx={{ width: 24, height: 24 }} src={sharedPost.receiver.imageUrl}>
                        <CloudIcon sx={{ fontSize: 14 }} />
                      </Avatar>
                      <span className='ml-1 text-dark'>{sharedPost.receiver.name}</span>
                    </div>
                  </div>

                  <Box className='flex justify-end flex-grow'>
                    <Button variant='outlined' onClick={() => onDeleteSharedPost(sharedPost.id)}>
                      공유 리스트에서 제거
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Box className='py-[140px] text-center text-[#959595]'>
                <Box className='w-[60px] h-[60px] mx-auto mb-[17px] bg-[#d0d0d0] rounded-full flex items-center justify-center'>
                  <FiSearch className='text-white text-[27px]' />
                </Box>
                결과가 없습니다.
              </Box>
            )}
          </>
        )}
      </Box>
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
