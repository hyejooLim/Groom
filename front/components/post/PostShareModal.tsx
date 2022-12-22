import React, { FC, useCallback, MouseEvent, useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { BsCloudFill, BsPersonPlusFill, BsCheck2 } from 'react-icons/bs';
import { MdArrowDropDown, MdOutlineClose } from 'react-icons/md';
import { Oval } from 'react-loader-spinner';
import classNames from 'classnames';

import { Sharer } from '../../types';
import BasicModal from '../common/BasicModal';
import useGetNeighbors from '../../hooks/query/neighbors';
import * as S from '../../styles/ts/components/post/PostShareModal';

interface PostShareModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSharePost: (sharers: Sharer[]) => void;
}

const PostShareModal: FC<PostShareModalProps> = ({ isOpen, isLoading, onClose, onSharePost }) => {
  const { data: neighbors } = useGetNeighbors();

  const [sharers, setSharers] = useState<Sharer[]>([]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingShare(true);
    }

    setIsLoadingShare(false);
  }, [isLoading]);

  const handleClick = useCallback((e: any) => {
    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;
    const listTitle = document.querySelector('.list_title') as HTMLDivElement;
    const labelContainer = document.querySelector('.label_container') as HTMLDivElement;

    if (!dropdown.contains(e.target) && !listTitle.contains(e.target) && !labelContainer.contains(e.target)) {
      setIsShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    if (isShowDropdown) {
      window.addEventListener('click', handleClick, true);
    }

    return () => {
      window.removeEventListener('click', handleClick, true);
    };
  }, [isShowDropdown]);

  const handleClose = useCallback(() => {
    onClose();
    setSharers([]);
  }, [onClose]);

  const onClickSharer = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const neighborId = Number(e.currentTarget?.dataset?.neighborId);
      const neighborName = e.currentTarget?.dataset?.neighborName;

      if (sharers.find((sharer) => sharer.id === neighborId)) {
        onRemoveSharer(neighborId);
        return;
      }

      setSharers([
        ...sharers,
        {
          id: neighborId,
          name: neighborName,
        },
      ]);
    },
    [sharers]
  );

  const onClickAllSharers = useCallback(() => {
    if (sharers.length === neighbors.length) {
      onRemoveAllSharers();
      return;
    }

    setSharers(
      neighbors.map((neighbor) => {
        return { id: neighbor.id, name: neighbor.name };
      })
    );
  }, [sharers, neighbors]);

  const onRemoveSharer = useCallback(
    (id: number) => {
      setSharers(sharers.filter((sharer) => sharer.id !== id));
    },
    [sharers]
  );

  const onRemoveAllSharers = useCallback(() => {
    setSharers([]);
  }, []);

  return (
    <BasicModal title='게시글을 공유할 이웃들을 선택해 보세요!' isOpen={isOpen} onClose={handleClose}>
      <S.LabelContainer className='label_container'>
        {sharers.length === 0 && (
          <div className='icon_wrapper'>
            <BsPersonPlusFill className='icon' />
          </div>
        )}
        {sharers.map((sharer) => (
          <div className='label'>
            <span>{sharer.name}</span>
            <MdOutlineClose className='icon' onClick={() => onRemoveSharer(sharer.id)} />
          </div>
        ))}
      </S.LabelContainer>
      <S.DropdownWrapper>
        <div className='list_title' onClick={() => setIsShowDropdown((prev) => !prev)}>
          <span>내 이웃 리스트</span>
          <MdArrowDropDown className='icon' />
        </div>
        <div className={classNames('dropdown', { isShow: isShowDropdown })}>
          <div className='all_share' onClick={onClickAllSharers}>
            전체 공유
          </div>
          <div className='item_list'>
            {neighbors?.map((neighbor) => (
              <div
                className='item_wrapper'
                data-neighbor-id={neighbor.id}
                data-neighbor-name={neighbor.name}
                onClick={onClickSharer}
              >
                <Avatar
                  size={20}
                  icon={<BsCloudFill style={{ height: '20px', lineHeight: '20px' }} />}
                  src={neighbor?.imageUrl}
                />
                <span className='name'>{neighbor.name}</span>
                {sharers.find((sharer) => sharer.id === neighbor.id) && <BsCheck2 />}
              </div>
            ))}
          </div>
        </div>
      </S.DropdownWrapper>
      <S.ShareButtonWrapper>
        <Button className='share_btn' onClick={() => onSharePost(sharers)} disabled={sharers.length === 0}>
          {isLoadingShare ? (
            <Oval height={20} width={20} color='#fff' secondaryColor='#eee' strokeWidth={6} />
          ) : (
            '공유하기'
          )}
        </Button>
      </S.ShareButtonWrapper>
    </BasicModal>
  );
};

export default PostShareModal;
