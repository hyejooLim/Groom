import React, { FC, useCallback } from 'react';
import Router from 'next/router';
import { Form } from 'antd';

import useInput from '../../hooks/common/input';
import useGetUser from '../../hooks/query/useGetUser';
import useCreateComment from '../../hooks/query/useCreateComment';
import { PostItem } from '../../types';
import { AddCommentButton, StyledTextArea } from '../../styles/ts/components/CommentForm';

interface CommentFormProps {
  post: PostItem;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const { data: user } = useGetUser();
  const createComment = useCreateComment();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitForm = useCallback(() => {
    if (!user) {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      setCommentText('');
      return;
    }

    if (!commentText && !commentText.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    createComment.mutate({ data: { content: commentText, postId: post.id } });
    setCommentText('');
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
