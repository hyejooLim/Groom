import React, { FC, useCallback } from 'react';
import Modal from 'react-modal';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { GrTrash } from 'react-icons/gr';
import dayjs from 'dayjs';

import useGetTempPosts from '../hooks/query/useGetTempPosts';
import useDeleteTempPost from '../hooks/query/useDeleteTempPost';
import { TempPostItem } from '../types';
import {
  InnerModal,
  InfoBoxWrapper,
  HeadLayer,
  ItemInfoWrapper,
  RemoveButton,
  BodyLayer,
  FootLayer,
} from '../styles/ts/components/TempPostsModal';

Modal.setAppElement('#__next');

interface TempPostsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLoadPost: (post: TempPostItem) => void;
}

const TempPostsModal: FC<TempPostsModalProps> = ({ isOpen, setIsOpen, onLoadPost }) => {
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

  const onMouseOverTitle = (e, idx: number) => {
    const dd = e.target.closest('dd') as HTMLElement;
    dd.classList.add('hover');

    const innerModalLayerElement = document.querySelector('.inner_modal_layer') as HTMLElement;
    const headLayerElement = document.querySelector('.head_layer') as HTMLElement;
    const listItemElement = e.target.closest('.list_item') as HTMLElement;
    const itemInfoWrapper = dd.lastElementChild as HTMLElement;

    const innerModalLayerElementMarginLeft = getComputedStyle(innerModalLayerElement).marginLeft;
    const innerModalLayerElementPaddingTop = getComputedStyle(innerModalLayerElement).paddingTop;
    const headLayerElementHeight = headLayerElement.offsetHeight;
    const listItemElementHeight = listItemElement.offsetHeight;

    const computedLeft = Number(innerModalLayerElementMarginLeft.slice(0, -2)) + 96;
    const computedTop =
      Number(innerModalLayerElementPaddingTop.slice(0, -2)) +
      headLayerElementHeight +
      listItemElementHeight * (idx + 1) +
      22;

    itemInfoWrapper.style.left = computedLeft + 'px';
    itemInfoWrapper.style.top = computedTop + 'px';
  };

  const onMouseLeaveTitle = (e) => {
    const dd = e.target.closest('dd') as HTMLElement;
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
    <>
      <Modal className='modal_layer' isOpen={isOpen} onRequestClose={onCloseModal}>
        <InnerModal className='inner_modal_layer'>
          <HeadLayer className='head_layer'>
            <strong className='head_layer_title'>임시저장</strong>
            <div className='head_layer_info'>
              <AiFillQuestionCircle className='info_icon' />
              <InfoBoxWrapper className='info_box_wrapper'>
                <div className='info_box'>
                  최대 100개의 글을 임시저장할 수 있습니다.
                  <br />
                  임시저장 글은 저장일로부터 90일간 보관됩니다.
                </div>
              </InfoBoxWrapper>
            </div>
          </HeadLayer>

          <BodyLayer className='body_layer'>
            <div className='list_container'>
              {tempPosts?.length === 0 ? (
                <div className='empty'>임시저장된 글이 없습니다.</div>
              ) : (
                <div className='list_wrapper'>
                  <div className='list'>
                    {tempPosts?.map((post, idx) => (
                      <div className='list_item' key={post.id}>
                        <dt>{getDateDiff(post.createdAt)}</dt>
                        <dd>
                          <a
                            className='list_item_link'
                            onClick={() => onLoadPost(post)}
                            onMouseOver={(e) => onMouseOverTitle(e, idx)}
                            onMouseLeave={onMouseLeaveTitle}
                          >
                            {post.title || '제목 없음'}
                          </a>
                          <RemoveButton type='button' className='remove btn' onClick={() => onDeleteTempPost(post.id)}>
                            <GrTrash className='trash_icon' />
                          </RemoveButton>
                          <ItemInfoWrapper className='item_info_wrapper' style={{ left: '0', top: '0' }}>
                            <div className='item_info'>
                              {!post.content || !post.content.trim() ? '[내용 없음]' : post.content}
                            </div>
                          </ItemInfoWrapper>
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </BodyLayer>

          <FootLayer className='foot_layer'>
            <div className='btn_wrapper'>
              <button type='button' className='cancel btn' onClick={onCloseModal}>
                취소
              </button>
              <button type='button' className='default btn'>
                임시저장하기
              </button>
            </div>
          </FootLayer>
        </InnerModal>
      </Modal>
    </>
  );
};

export default TempPostsModal;
