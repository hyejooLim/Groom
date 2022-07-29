import React, { FC } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AiFillQuestionCircle } from 'react-icons/ai';

import { PostItem } from '../types';

Modal.setAppElement('#__next');

const ModalWrapper = styled.div`
  .ReactModal__Content.ReactModal__Content--after-open {
    transform: translate(0);
  }

  .ReactModal__Content {
    transition: transform 0.2s cubic-bezier(0, 1, 1, 1);
    transform: translateY(300px);
  }

  // 스타일 적용 안 됨
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    min-width: 944px;
    background-color: #fff;
    box-shadow: 0 -1px 5px 0 rgb(0 0 0 / 3%), 0 -5px 13px 0 rgb(0 0 0 / 4%);
  }
`;

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
  display: flex;
  align-items: center;
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

    .info_icon {
      margin: 5px 0 0 8px;
      display: block;
      width: 17px;
      height: 17px;
      background-position: -60px 0;

      &:hover {
        ${InfoBoxWrapper} {
          display: block;
        }
      }
    }
  }
`;

const BodyLayer = styled.div`
  .list_wrapper {
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

interface ReactModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tempSavePosts: PostItem[];
}

const ReactModal: FC<ReactModalProps> = ({ isOpen, setIsOpen, tempSavePosts }) => {
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onRemovePost = () => {
    confirm('임시저장 글을 정말 삭제하시곘습니까?');

    // 임시저장 글 삭제
  };

  return (
    <ModalWrapper>
      <Modal className='modal' isOpen={isOpen} onRequestClose={onCloseModal}>
        <InnerModal>
          <HeadLayer>
            <strong className='head_layer_title'>임시저장</strong>
            <div className='head_layer_info'>
              <AiFillQuestionCircle className='info_icon' style={{ top: '33px', left: '-3px' }} />
              <InfoBoxWrapper className='info_box_wrapper'>
                <div className='info_box'>
                  최대 100개의 글을 임시저장할 수 있습니다.
                  <br />
                  임시저장 글은 저장일로부터 90일간 보관됩니다.
                </div>
              </InfoBoxWrapper>
            </div>
          </HeadLayer>

          <BodyLayer>
            <div className='list_wrapper'>
              {tempSavePosts.length === 0 ? <div className='empty'>임시저장된 글이 없습니다.</div> : <div></div>}
            </div>
          </BodyLayer>

          <FootLayer>
            <div className='btn_wrapper'>
              <button type='button' className='cancel btn'>
                취소
              </button>
              <button type='button' className='default btn'>
                임시저장하기
              </button>
            </div>
          </FootLayer>
        </InnerModal>
      </Modal>
    </ModalWrapper>
  );
};

export default ReactModal;
