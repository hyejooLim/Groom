import React, { FC, useCallback, useState, useEffect } from 'react';
import { BsPersonPlusFill, BsCheck2 } from 'react-icons/bs';
import { Oval } from 'react-loader-spinner';
import Avatar from '@mui/material/Avatar';
import CloudIcon from '@mui/icons-material/Cloud';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import { Sharer } from '../../types';
import BasicModal from '../common/BasicModal';
import useGetNeighbors from '../../hooks/query/neighbors';

interface PostShareModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSharePost: (sharers: Sharer[]) => void;
}

const PostShareModal: FC<PostShareModalProps> = ({ isOpen, isLoading, onClose, onSharePost }) => {
  const { data: neighbors } = useGetNeighbors();

  const [sharers, setSharers] = useState<Sharer[]>([]);
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isLoading) {
      setIsLoadingShare(true);
    }

    setIsLoadingShare(false);
  }, [isLoading]);

  const handleClose = useCallback(() => {
    onClose();
    setSharers([]);
    setAnchorEl(null);
  }, [onClose]);

  const onRemoveSharer = (id: number) => {
    setSharers((prev) => prev.filter((sharer) => sharer.id !== id));
  };

  const onToggleSharer = useCallback(
    (sharerId: number) => {
      if (sharers.find((sharer) => sharer.id === sharerId)) {
        onRemoveSharer(sharerId);
        return;
      }

      const selectedNeighbor = neighbors.find((neighbor) => neighbor.id === sharerId);
      if (!selectedNeighbor) return;

      setSharers((prev) => [
        ...prev,
        {
          id: selectedNeighbor.id,
          name: selectedNeighbor.name,
        },
      ]);
    },
    [neighbors, sharers],
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 버튼의 위치를 기준으로 메뉴를 띄움
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <BasicModal title='게시글을 공유할 이웃들을 선택해 보세요!' isOpen={isOpen} onClose={handleClose}>
      <div
        className='h-12 bg-primary/80 text-white flex justify-center items-center rounded-3xl cursor-pointer hover:bg-primary/100 transition-colors'
        onClick={handleClick}
      >
        {sharers?.length === 0 ? (
          <BsPersonPlusFill size={20} />
        ) : (
          <span>
            {sharers
              .slice(0, 4)
              .map((s) => s.name)
              .join(', ')}
            {sharers.length > 4 && ' ...'}
          </span>
        )}
      </div>

      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {neighbors?.map((neighbor) => (
          <MenuItem
            key={neighbor.id}
            className='flex gap-x-4'
            onClick={() => {
              onToggleSharer(neighbor.id);
              handleCloseMenu();
            }}
            selected={!sharers.find((sharer) => sharer.id === neighbor.id)}
          >
            <Avatar src={neighbor?.imageUrl} sx={{ width: 24, height: 24 }}>
              <CloudIcon sx={{ fontSize: 12 }} />
            </Avatar>
            <span className='name'>{neighbor.name}</span>
            {sharers.find((sharer) => sharer.id === neighbor.id) && <BsCheck2 />}
          </MenuItem>
        ))}
      </Menu>

      <div className='flex justify-center mt-8'>
        <Button
          className='!text-dark hover:!bg-primary/5'
          size='large'
          onClick={() => onSharePost(sharers)}
          disabled={sharers?.length === 0}
        >
          {isLoadingShare ? (
            <Oval height={20} width={20} color='#fff' secondaryColor='#eee' strokeWidth={6} />
          ) : (
            '공유하기'
          )}
        </Button>
      </div>
    </BasicModal>
  );
};

export default PostShareModal;
