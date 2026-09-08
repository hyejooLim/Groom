import React, { FC, useCallback, MouseEvent } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import { Button, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import useGetTempPosts from '@/hooks/query/tempPosts';
import { useDeleteTempPost } from '@/hooks/query/tempPost';
import BottomModal from '../common/BottomModal';
import { TempPostItem } from '@/@types/types';

interface TempPostsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLoadPost: (post: TempPostItem) => void;
  onSaveTempPost: () => void;
}

const TempPostsModal: FC<TempPostsModalProps> = ({ isOpen, setIsOpen, onLoadPost, onSaveTempPost }) => {
  const { data: tempPosts } = useGetTempPosts();
  const deleteTempPost = useDeleteTempPost();

  const getDateDiff = useCallback((createdAt: string) => {
    const createdDate = dayjs(createdAt);
    const nowDate = dayjs();

    const milliSeconds = nowDate.diff(createdDate);
    const seconds = milliSeconds / 1000;

    if (seconds < 60) {
      return '방금';
    }

    const minutes = seconds / 60;
    if (minutes < 60) {
      return `${Math.floor(minutes)}분 전`;
    }

    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)}시간 전`;
    }

    return createdDate.format('YYYY.MM.DD');
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onMouseOverTitle = (e: MouseEvent<HTMLAnchorElement>) => {
    const dd = e.currentTarget.closest('dd') as HTMLElement;
    dd.classList.add('hover');

    const innerModalLayerElement = document.querySelector('.inner_modal_layer') as HTMLElement;
    const listItemElement = e.currentTarget.closest('.list_item') as HTMLElement;
    const itemInfoWrapper = dd.lastElementChild as HTMLElement;

    const innerModalLayerElementMarginLeft = getComputedStyle(innerModalLayerElement).marginLeft;
    const listItemElementClientY = listItemElement.getBoundingClientRect().y;

    const computedLeft = Number(innerModalLayerElementMarginLeft.slice(0, -2)) + 96;
    const computedTop = listItemElementClientY - 191;

    itemInfoWrapper.style.left = computedLeft + 'px';
    itemInfoWrapper.style.top = computedTop + 'px';
  };

  const onMouseLeaveTitle = (e: MouseEvent<HTMLAnchorElement>) => {
    const dd = e.currentTarget.closest('dd') as HTMLElement;
    dd.classList.remove('hover');
  };

  const onDeleteTempPost = (id: number) => {
    const confirm = window.confirm('임시저장글을 정말 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deleteTempPost.mutate(id);
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onCloseModal}>
      <div className='inner_modal_layer w-[860px] mx-auto'>
        {/* Head */}
        <div className='flex items-center border-b-2 border-black pb-3'>
          <strong className='text-2xl'>임시저장</strong>
          <div className='relative group cursor-pointer'>
            <Tooltip
              title={
                <div className='text-[12px] leading-relaxed'>
                  최대 100개의 글을 임시저장할 수 있습니다.
                  <br />
                  임시저장 글은 저장일로부터 90일간 보관됩니다.
                </div>
              }
              placement='bottom-start'
              arrow
              slotProps={{
                popper: {
                  sx: {
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: 'white',
                      color: '#333',
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.3), 0 2px 5px 0 rgba(0,0,0,0.1)',
                      borderRadius: '1px',
                      padding: '9px 11px',
                      width: '287px',
                      height: '60px',
                      boxSizing: 'border-box',
                    },
                    '& .MuiTooltip-arrow': {
                      color: 'white',
                      '&::before': {
                        border: '1px solid #ddd',
                      },
                    },
                  },
                },
              }}
            >
              <div>
                <AiFillQuestionCircle className='ml-2 text-grey text-xl' />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Body */}
        <div className='overflow-auto h-[387px] border-b border-[#f0f0f0]'>
          {tempPosts?.length === 0 ? (
            <div className='text-center my-[183px] text-[#909090] font-light text-[14px]'>
              임시저장된 글이 없습니다.
            </div>
          ) : (
            <div className='overflow-auto'>
              <div className='py-[14px] pb-[24px]'>
                {tempPosts?.map((post) => (
                  <div key={post.id} className='list_item flex items-center text-lg'>
                    {/* 날짜 */}
                    <dt className="w-[96px] font-light text-black font-['Avenir_Next',sans-serif]">
                      {getDateDiff(post.createdAt)}
                    </dt>
                    {/* 내용 */}
                    <dd>
                      <Tooltip
                        title={
                          <div className='text-sm'>
                            {!post.content || !post.content.trim() ? '[내용 없음]' : post.content}
                          </div>
                        }
                        placement='bottom-start'
                        arrow
                        slotProps={{
                          popper: {
                            sx: {
                              '& .MuiTooltip-tooltip': {
                                backgroundColor: 'white',
                                color: '#333',
                                boxShadow: '0 0 1px 0 rgba(0,0,0,0.3), 0 2px 5px 0 rgba(0,0,0,0.1)',
                                borderRadius: '1px',
                                padding: '9px 13px 12px 16px',
                                maxWidth: '600px',
                                width: '600px',
                              },
                              '& .MuiTooltip-arrow': {
                                color: 'white',
                                '&::before': {
                                  border: '1px solid #ddd',
                                },
                              },
                            },
                          },
                        }}
                      >
                        <a
                          className='inline-block max-w-[719px] mr-[2px] leading-[19px] align-top whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer text-[#333] hover:underline'
                          onClick={() => onLoadPost(post)}
                          onMouseOver={onMouseOverTitle}
                          onMouseLeave={onMouseLeaveTitle}
                        >
                          {post.title || '제목 없음'}
                        </a>
                      </Tooltip>
                    </dd>
                    <IconButton
                      aria-label='delete'
                      size='small'
                      color='error'
                      className='ml-4'
                      onClick={() => onDeleteTempPost(post.id)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize='inherit' />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='pt-[30px] text-center text-0 leading-0'>
          <div className='flex justify-center gap-x-4'>
            <Button type='button' variant='outlined' className='!rounded-3xl !text-lg !py-2' onClick={onCloseModal}>
              취소
            </Button>
            <Button
              type='button'
              variant='contained'
              className='!rounded-3xl !text-lg !px-10 !py-2'
              onClick={onSaveTempPost}
            >
              임시저장하기
            </Button>
          </div>
        </div>
      </div>
    </BottomModal>
  );
};

export default TempPostsModal;
