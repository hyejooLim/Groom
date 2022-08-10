import React, { FC } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { GrTrash } from 'react-icons/gr';

import { TempPostItem } from '../types';

Modal.setAppElement('#__next');

const InnerModal = styled.div`
  width: 860px;
  margin: 0 auto;
  padding: 35px 0 42px;
  box-sizing: border-box;
`;

const InfoBoxWrapper = styled.div`
  display: none;
  width: 287px;
  height: 60px;
  padding: 9px 11px;
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);
  font-size: 12px;
  top: 33px;
  left: -2px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 13px;
    width: 12px;
    height: 12px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -7px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
`;

const HeadLayer = styled.div`
  border-bottom: 2px solid #000;

  ::after {
    display: block;
    clear: both;
    content: '';
  }

  .head_layer_title {
    float: left;
    padding: 0 0 12px;
    font-weight: 400;
    font-size: 16px;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
    color: #000;
  }

  .head_layer_info {
    float: left;
    position: relative;

    &:hover {
      ${InfoBoxWrapper} {
        display: block;
      }
    }

    .info_icon {
      margin: 3px 0 0 8px;
      display: block;
      width: 17px;
      height: 17px;
      background-position: -60px 0;
    }
  }
`;

const ItemInfoWrapper = styled.div`
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);

  .item_info {
    display: block;
    display: -webkit-box;
    overflow: hidden;
    max-height: 60px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
    font-size: 13px;
    line-height: 20px;
    color: #777;
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: -7px;
    left: 13px;
    width: 12px;
    height: 12px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const RemoveBtn = styled.button`
  display: none;
  height: 13px;
  padding: 0;

  .trash_icon {
    width: 13px;
    height: 13px;
    vertical-align: top;
    margin: 3px 0 0 5px;
  }
`;

const BodyLayer = styled.div`
  .list_container {
    overflow: auto;
    height: 387px;
    border-bottom: 1px solid #f0f0f0;

    .empty {
      text-align: center;
      margin: 183px auto;
      color: #909090;
      font-weight: 300;
      font-size: 14px;
    }

    .list_wrapper {
      overflow: auto;

      .list {
        padding: 14px 0 24px;
        box-sizing: border-box;

        .list_item {
          padding: 14px 0 0;
          font-size: 13px;

          ::after {
            display: block;
            clear: both;
            content: '';
          }

          & dt {
            float: left;
            width: 96px;
            padding: 2px 0 0;
            line-height: 18px;
            font-family: Avenir Next, Noto Sans DemiLight, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
            color: #000;
          }

          & dd {
            display: block;
            float: left;
            position: relative;
            width: 746px;
            color: #333;
            box-sizing: border-box;
            margin: 0;

            ::after {
              display: block;
              clear: both;
              content: '';
            }

            &:hover {
              ${RemoveBtn} {
                display: inline-block;
              }
            }

            .list_item_link {
              margin-right: 2px;
              display: inline-block;
              overflow: hidden;
              max-width: 719px;
              line-height: 19px;
              vertical-align: top;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
              color: #333;

              &:hover {
                text-decoration: underline;
              }
            }

            .item_info_wrapper {
              display: none;
              position: fixed;
              width: 600px;
              padding: 9px 13px 12px 16px;
            }
          }

          & dd.hover {
            ${ItemInfoWrapper} {
              display: block;
            }
          }
        }
      }
    }
  }
`;

const FootLayer = styled.div`
  .btn_wrapper {
    padding: 30px 0 0;
    font-size: 0;
    line-height: 0;
    text-align: center;

    .btn {
      width: 150px;
      margin: 0 4px;
      height: 40px;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      font-size: 13px;
      transition: border-color 0.2s, color 0.2s, background-color 0.2s;
    }

    .cancel {
      width: 88px;
    }

    .default {
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
    }

    .btn:not([disabled]):focus,
    .btn:not([disabled]):hover {
      border-color: #f54;
      color: #fff;
      background-color: #f54;
    }
  }
`;

interface TempPostsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tempPosts: TempPostItem[];
  onLoadPost: (post: TempPostItem) => void;
}

const TempPostsModal: FC<TempPostsModalProps> = ({ isOpen, setIsOpen, tempPosts, onLoadPost }) => {
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

  const onRemovePost = () => {
    confirm('임시저장 글을 정말 삭제하시곘습니까?');

    // 임시저장 글 삭제
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
                    {tempPosts.map((post, idx) => (
                      <div className='list_item' key={post.id}>
                        <dt>?분전</dt>
                        <dd>
                          <a
                            className='list_item_link'
                            onClick={() => onLoadPost(post)}
                            onMouseOver={(e) => onMouseOverTitle(e, idx)}
                            onMouseLeave={onMouseLeaveTitle}
                          >
                            {post.title || '제목 없음'}
                          </a>
                          <RemoveBtn type='button' className='remove btn'>
                            <GrTrash className='trash_icon' />
                          </RemoveBtn>
                          <ItemInfoWrapper className='item_info_wrapper' style={{ left: '0', top: '0' }}>
                            <div className='item_info'>
                              {!post.thumbnailContent || !post.thumbnailContent.trim()
                                ? '[내용 없음]'
                                : post.thumbnailContent}
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
