import React, { ReactNode } from 'react';
import { Drawer } from '@mui/material';

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function BottomModal({ isOpen, onClose, children }: BottomModalProps) {
  return (
    <Drawer
      anchor='bottom'
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: 'w-full rounded-t-xl bg-white py-14 shadow-xl',
      }}
    >
      {children}
    </Drawer>
  );
}
