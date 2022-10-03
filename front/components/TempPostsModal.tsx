import React, { FC, useCallback, MouseEvent } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { GrTrash } from 'react-icons/gr';
import dayjs from 'dayjs';

import useGetTempPosts from '../hooks/query/useGetTempPosts';
import useDeleteTempPost from '../hooks/query/useDeleteTempPost';
import { TempPostItem } from '../types';
import ReactModal from './ReactModal';
import * as S from '../styles/ts/components/TempPostsModal';

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
    <ReactModal isOpen={isOpen} onRequestClose={onCloseModal}>
      <S.HeadLayer className='head_layer'>
        <strong className='head_layer_title'>임시저장</strong>
        <div className='head_layer_info'>
          <AiFillQuestionCircle className='info_icon' />
          <S.InfoBoxWrapper className='info_box_wrapper'>
            <div className='info_box'>
              최대 100개의 글을 임시저장할 수 있습니다.
              <br />
              임시저장 글은 저장일로부터 90일간 보관됩니다.
            </div>
          </S.InfoBoxWrapper>
        </div>
      </S.HeadLayer>
      <S.BodyLayer className='body_layer'>
        <div className='list_container'>
          {tempPosts?.length === 0 ? (
            <div className='empty'>임시저장된 글이 없습니다.</div>
          ) : (
            <div className='list_wrapper'>
              <div className='list'>
                {tempPosts?.map((post) => (
                  <div className='list_item' key={post.id}>
                    <dt>{getDateDiff(post.createdAt)}</dt>
                    <dd>
                      <a
                        className='list_item_link'
                        onClick={() => onLoadPost(post)}
                        onMouseOver={onMouseOverTitle}
                        onMouseLeave={onMouseLeaveTitle}
                      >
                        {post.title || '제목 없음'}
                      </a>
                      <S.RemoveButton type='button' className='remove btn' onClick={() => onDeleteTempPost(post.id)}>
                        <GrTrash className='trash_icon' />
                      </S.RemoveButton>
                      <S.ItemInfoWrapper className='item_info_wrapper' style={{ left: '0', top: '0' }}>
                        <div className='item_info'>
                          {!post.content || !post.content.trim() ? '[내용 없음]' : post.content}
                        </div>
                      </S.ItemInfoWrapper>
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </S.BodyLayer>
      <S.FootLayer className='foot_layer'>
        <div className='btn_wrapper'>
          <button type='button' className='cancel btn' onClick={onCloseModal}>
            취소
          </button>
          <button type='button' className='default btn' onClick={onSaveTempPost}>
            임시저장하기
          </button>
        </div>
      </S.FootLayer>
    </ReactModal>
  );
};

export default TempPostsModal;
