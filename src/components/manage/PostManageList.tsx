import React, { FC, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import { currentPageState, firstIndexState, lastIndexState, MANAGE_PAGE_SIZE } from '@/recoil/manage';
import { useSsrAllowedState } from '@/recoil/persist';
import PaginationContainer from '../common/PaginationContainer';
import { useGetUser } from '@/hooks/query/user';
import { useDeletePost, useUnSubscribePost, useToggleIsPublicPost } from '@/hooks/query/post';
import { PostItem } from '@/@types/types';

interface PostManageListProps {
  posts: PostItem[];
  isLoading?: boolean;
  isFetching: boolean;
  onClickCategory: (id: number) => void;
}

const PostManageList: FC<PostManageListProps> = ({ posts, isLoading, isFetching, onClickCategory }) => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const deletePost = useDeletePost();
  const toggleIsPublicPost = useToggleIsPublicPost();
  const unSubscribePost = useUnSubscribePost();

  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const setSsrAllowed = useSsrAllowedState();
  useEffect(setSsrAllowed, [setSsrAllowed]);

  const onInitPage = () => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(MANAGE_PAGE_SIZE);
  };

  useEffect(() => {
    onInitPage();
  }, [router.query]);

  const onDeletePost = useCallback((id: number) => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deletePost.mutate(id);
  }, []);

  const onToggleIsPublicPost = (id: number, isPublic: boolean) => {
    toggleIsPublicPost.mutate({ id, isPublic: !isPublic });
  };

  const onUnSubscribe = useCallback((id: number) => {
    const confirm = window.confirm('구독을 취소하시겠습니까?');
    if (!confirm) {
      return;
    }

    unSubscribePost.mutate(id);
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
          <Box className='flex justify-center items-center h-[383px]'>
            <CircularProgress size={30} sx={{ color: '#ddd' }} />
          </Box>
        ) : (
          <>
            {posts?.length > 0 ? (
              posts.slice(firstIndex, lastIndex).map((post) => (
                <Box
                  key={post.id}
                  className='group flex items-center justify-between px-4 py-[13px] border-b border-[#f1f3f6] hover:bg-[#fafbfd] transition-colors relative'
                >
                  <Box>
                    <Box className='flex items-center gap-[5px]'>
                      <Link href={`/post/${post.id}`} className='no-underline'>
                        <Typography className='!text-[16px] !text-[#333] hover:underline cursor-pointer'>
                          {post.title}
                        </Typography>
                      </Link>
                      <AttachFileOutlinedIcon fontSize='small' className='text-[#999]' />
                    </Box>

                    <Box className='flex items-center text-[14px]'>
                      <a
                        onClick={() => onClickCategory(post?.categoryId)}
                        className='text-[#ff5544] cursor-pointer hover:underline'
                      >
                        {post?.category.name}
                      </a>

                      {[post.author?.name, dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')].map((info, idx) => (
                        <span
                          key={idx}
                          className="text-[#808080] flex items-center before:content-[''] before:inline-block before:w-[2px] before:h-[2px] before:mx-2 before:bg-[#c5cdd7] before:rounded-full"
                        >
                          {info}
                        </span>
                      ))}
                    </Box>
                  </Box>

                  {!post.isPublic && (
                    <AiOutlineEyeInvisible className='absolute right-[28px] text-[20px] text-[#ddd]' />
                  )}

                  <Box className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                    {user?.id === post?.authorId && (
                      <>
                        <Link href={`/write/${post.id}`}>
                          <Button className='!min-w-[40px] !h-6 !text-[12px] !text-[#333] !border !border-[#c5cdd7] !bg-white hover:!border-[#808080] !shadow-sm'>
                            수정
                          </Button>
                        </Link>
                        <Button
                          onClick={() => onDeletePost(post.id)}
                          className='!min-w-[40px] !h-6 !text-[12px] !text-[#333] !border !border-[#c5cdd7] !bg-white hover:!border-[#808080] !shadow-sm'
                        >
                          삭제
                        </Button>
                        <Button
                          onClick={() => onToggleIsPublicPost(post.id, post.isPublic)}
                          className='!min-w-[50px] !h-6 !text-[12px] !text-[#333] !border !border-[#c5cdd7] !bg-white hover:!border-[#808080] !shadow-sm'
                        >
                          {post.isPublic ? '공개' : '비공개'}
                        </Button>
                      </>
                    )}
                    {router.pathname.includes('/manage/subscribedPosts') && (
                      <Button
                        onClick={() => onUnSubscribe(post.id)}
                        className='!min-w-[70px] !h-6 !text-[12px] !text-[#333] !border !border-[#c5cdd7] !bg-white hover:!border-[#808080] !shadow-sm'
                      >
                        구독 취소
                      </Button>
                    )}
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
        total={posts?.length}
        onChange={onChangePage}
      />
    </>
  );
};

export default PostManageList;
