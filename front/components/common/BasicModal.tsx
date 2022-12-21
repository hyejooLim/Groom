import React, { FC } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const InnerModal = styled.div`
  text-align: center;
`;

interface BasicModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BasicModal: FC<BasicModalProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Modal className='basic_modal' title={title} visible={isOpen} onCancel={onClose}>
      <InnerModal>{children}</InnerModal>
    </Modal>
  );
};

export default BasicModal;
