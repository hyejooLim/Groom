import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { MdClose } from 'react-icons/md';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  title?: string;
  hideClose?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BasicModal: FC<BasicModalProps> = ({ title, hideClose, isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        {!hideClose && <MdClose className='absolute right-5 top-5 cursor-pointer' size={20} onClick={onClose} />}
        <Typography variant='h6' component='h2' className='text-center'>
          {title}
        </Typography>
        <div className='mt-8'>{children}</div>
      </Box>
    </Modal>
  );
};

export default BasicModal;
