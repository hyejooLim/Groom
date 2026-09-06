import React, { FC, SubmitEvent, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import useInput from '../../hooks/common/input';
import { useCreateComment } from '../../hooks/query/comment';
import { PostItem } from '../../types';

interface CommentFormProps {
  post: PostItem;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const { status } = useSession();

  const { mutate: createComment, isPending } = useCreateComment();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitForm = useCallback(
    (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (status === 'unauthenticated') {
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

      createComment({ data: { content: commentText, postId: post.id } });
      setCommentText('');
    },
    [status, commentText, post],
  );

  return (
    <Box component='form' onSubmit={onSubmitForm} sx={{ mt: '50px', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <TextField
        multiline
        rows={4}
        fullWidth
        value={commentText}
        onChange={onChangeCommentText}
        placeholder='내용을 입력해 주세요.'
        variant='outlined'
        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type='submit'
          variant='text'
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={16} color='inherit' /> : null}
          className='!text-primary'
        >
          {isPending ? 'Writing...' : 'Write'}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
