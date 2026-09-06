import { FC } from 'react';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import BasicModal from '../common/BasicModal';

interface AutoSaveModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  autoSaveData: any;
}

const AutoSaveModal: FC<AutoSaveModalProps> = ({ isOpen, onConfirm, onCancel, autoSaveData }) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onCancel} title='임시저장 글 불러오기'>
      <div className='flex flex-col gap-6'>
        <p className='text-center text-md text-gray-700'>
          {autoSaveData && dayjs(autoSaveData.createdAt).format('YYYY-MM-DD HH:mm:ss')}에 저장된 글이 있습니다.
          <br />
          이어서 작성하시겠습니까?
        </p>

        <div className='flex justify-center gap-x-3 mt-4'>
          <Button type='button' variant='outlined' onClick={onCancel}>
            취소
          </Button>
          <Button type='button' variant='contained' onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default AutoSaveModal;
