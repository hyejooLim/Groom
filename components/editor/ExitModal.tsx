import { FC } from 'react';
import { Button } from '@mui/material';
import BasicModal from '../common/BasicModal';

interface ExitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitModal: FC<ExitModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <BasicModal isOpen={isOpen} onClose={onCancel} title='페이지 이탈 경고'>
      <div className='flex flex-col gap-6'>
        <p className='text-center text-md text-gray-700'>
          사이트에서 나가시겠습니까?
          <br />
          변경사항이 저장되지 않을 수 있습니다.
        </p>

        <div className='flex justify-center gap-x-3 mt-4'>
          <Button type='button' variant='outlined' color='error' onClick={onCancel}>
            취소
          </Button>
          <Button type='button' variant='contained' color='error' onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default ExitModal;
