import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

import { PostType } from '../types';
import useInput from '../hooks/input';

const AddCommentButton = styled(Button)`
  border: 0;
  float: right;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 10px;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

interface CommentFormProps {
  post: PostType;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmitForm = useCallback(() => {
    if (!commentText && !commentText.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    console.log(commentText);
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
        <Input.TextArea
          rows={4}
          style={{ width: '100%', fontSize: '15px', border: '1px solid #DDDDDD', lineHeight: '160%' }}
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
