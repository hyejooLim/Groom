import React, { FC, useCallback } from 'react';
import { Form } from 'antd';

import { PostItem } from '../types';
import useInput from '../hooks/common/input';
import useCreateComment from '../hooks/query/useCreateComment';
import { AddCommentButton, StyledTextArea } from '../styles/ts/components/CommentForm';

interface CommentFormProps {
  post: PostItem;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const createComment = useCreateComment();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitForm = useCallback(async () => {
    try {
      if (!commentText && !commentText.trim()) {
        alert('내용을 입력해 주세요.');
        return;
      }

      createComment.mutate({ data: { content: commentText, postId: post.id } });
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  }, [commentText, post]);

  return (
    <Form onFinish={onSubmitForm} style={{ marginTop: 50 }}>
      <Form.Item>
        <StyledTextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
          placeholder='내용을 입력해 주세요.'
        />
        <AddCommentButton htmlType='submit' type='primary' loading={createComment.isLoading}>
          Write
        </AddCommentButton>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
