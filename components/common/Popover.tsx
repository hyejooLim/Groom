import React, { FC, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import { PopoverWrapper } from "../../styles/ts/components/common/Popover";

interface PopoverProps {
  isShow: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popover: FC<PopoverProps> = ({ isShow, onClose, children }) => {
  const popoverRef = useRef(null);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shareButton = document.querySelector(".share") as HTMLButtonElement;
      const antModalWrap = document.querySelector(
        ".ant-modal-wrap"
      ) as HTMLDivElement;

      if (
        !popoverRef.current?.contains(target) &&
        !shareButton?.contains(target) &&
        !antModalWrap?.contains(target)
      ) {
        onClose();
      }
    },
    [popoverRef.current, onClose]
  );

  useEffect(() => {
    if (isShow) {
      window.addEventListener("mousedown", handleClose);
    }

    return () => {
      window.removeEventListener("mousedown", handleClose);
    };
  }, [isShow]);

  return (
    <PopoverWrapper
      ref={popoverRef}
      className={classNames("popover", { isShow })}
      onClick={onClose}
    >
      <span onClick={(e) => e.stopPropagation()}>{children}</span>
    </PopoverWrapper>
  );
};

export default Popover;
