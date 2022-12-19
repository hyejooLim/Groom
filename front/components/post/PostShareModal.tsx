import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import BasicModal from '../common/BasicModal';
import * as S from '../../styles/ts/components/post/PostShareModal';

interface PostShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSharePost: (email: string) => void;
}

const PostShareModal: FC<PostShareModalProps> = ({ isOpen, onClose, onSharePost }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g;
    setEmailError(e.target.value.length > 0 && !regex.test(e.target.value));
  };

  const handleClose = useCallback(() => {
    onClose();

    setEmail('');
    setEmailError(false);
  }, [onClose]);

  return (
    <BasicModal title='공유하고 싶은 유저의 이메일을 입력하세요!' isOpen={isOpen} onClose={handleClose}>
      <S.InputWrapper
        value={email}
        onChange={onChangeEmail}
        type='email'
        placeholder='이메일을 입력하세요.'
        autoFocus
      />
      <S.ErrorMessage className={classNames({ error: emailError })}>이메일 형식이 올바르지 않습니다.</S.ErrorMessage>
      <S.ShareButtonWrapper>
        <Button className='share_btn' onClick={() => onSharePost(email)} disabled={!email || emailError}>
          공유하기
        </Button>
      </S.ShareButtonWrapper>
    </BasicModal>
  );
};

export default PostShareModal;
