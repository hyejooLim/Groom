import React, { FC, useCallback, useState } from 'react';
import { Form } from 'antd';

import { PostItem } from '../types';
import useInput from '../hooks/input';
import { AddCommentButton, StyledTextArea } from '../styles/ts/components/CommentForm';

interface CommentFormProps {
  post: PostItem;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = useCallback(() => {
    if (!commentText && !commentText.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    setLoading(true);
    setCommentText('');

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // addComment action
  }, [commentText]);

  return (
    <Form onFinish={onSubmitForm} style={{ marginTop: 50 }}>
      <Form.Item>
        <StyledTextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
          placeholder='내용을 입력해 주세요.'
        />
        <AddCommentButton htmlType='submit' type='primary' loading={loading}>
          Write
        </AddCommentButton>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
