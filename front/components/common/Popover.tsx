import React, { FC, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const PropoverWrapper = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);

  &.isShow {
    visibility: visible;
  }

  &:not(.isShow) {
    visibility: hidden;
  }

  &::before {
    content: '';
    border-top: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    left: 13px;
    top: 116px;
    z-index: 2;
  }

  &::after {
    content: '';
    border-top: 6px solid #999;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    left: 13px;
    top: 117px;
  }

  & div {
    width: 100%;
    padding: 7px 18px;
    font-family: 'Noto Sans DemiLight', AppleSDGothicNeo, 'Malgun Gothic', '맑은 고딕', '돋움', dotum, sans-serif !important;
    line-height: 16px;
    color: #333;
    text-align: left;
    box-sizing: border-box;
    text-decoration: none;

    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .icon {
      margin-right: 8px;
    }
  }
`;

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
      const shareButton = document.querySelector('.share') as HTMLButtonElement;

      if (!popoverRef.current.contains(target) && !shareButton.contains(target)) {
        onClose();
      }
    },
    [popoverRef.current, onClose]
  );

  useEffect(() => {
    if (isShow) {
      window.addEventListener('mousedown', handleClose);
    }

    return () => {
      window.removeEventListener('mousedown', handleClose);
    };
  }, [isShow]);

  return (
    <PropoverWrapper ref={popoverRef} className={classNames('popover', { isShow })} onClick={onClose}>
      <span onClick={(e) => e.stopPropagation()}>{children}</span>
    </PropoverWrapper>
  );
};

export default Popover;
