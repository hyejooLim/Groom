import React, { FC, ReactNode } from "react";
import Modal from "react-modal";

import { InnerModal } from "../../styles/ts/components/common/ReactModal";

Modal.setAppElement("#__next");

interface ReactModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: ReactNode;
}

const ReactModal: FC<ReactModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      className="modal_layer"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <InnerModal className="inner_modal_layer">{children}</InnerModal>
    </Modal>
  );
};

export default ReactModal;
