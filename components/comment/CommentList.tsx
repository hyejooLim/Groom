import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CloudIcon from '@mui/icons-material/Cloud';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import dayjs from 'dayjs';

import { useGetUser } from '../../hooks/query/user';
import useGetComments from '../../hooks/query/comments';
import { useUpdateComment, useDeleteComment } from '../../hooks/query/comment';
import { CommentItem } from '../../types';

interface CommentListProps {
  postId: number;
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const { data: user } = useGetUser();

  const { data: comments } = useGetComments(postId);
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [currentComment, setCurrentComment] = useState<CommentItem>(null);

  const onClickModifyButton = useCallback(
    (id: number, content: string) => {
      setCurrentComment({
        ...currentComment,
        id,
        content,
      });
    },
    [currentComment],
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentComment({
        ...currentComment,
        content: e.target.value,
      });
    },
    [currentComment],
  );

  const onUpdateComment = useCallback(() => {
    if (!currentComment.content || !currentComment.content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    updateComment({ data: { id: currentComment.id, content: currentComment.content } });

    setTimeout(() => {
      setCurrentComment(null);
    }, 1000);
  }, [currentComment]);

  const onCancelUpdateComment = useCallback(() => {
    setCurrentComment(null);
  }, []);

  const onDeleteComment = useCallback((id: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }

    deleteComment(id);
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 'bold' }}>
        {`${comments?.length}개의 댓글`}
      </Typography>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments?.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems='flex-start' sx={{ flexDirection: 'column', py: 2 }}>
              {item.id === currentComment?.id ? (
                /* 1. 수정 모드 폼 */
                <Box
                  component='form'
                  onSubmit={(e) => {
                    e.preventDefault();
                    onUpdateComment();
                  }}
                  sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={currentComment.content}
                    onChange={onChangeContent}
                    autoFocus
                    sx={{ backgroundColor: 'white' }}
                  />
                  <Box sx={{ textAlign: 'end' }}>
                    <Button size='small' variant='text' color='inherit' type='submit' sx={{ fontSize: '12px' }}>
                      완료
                    </Button>
                    <Button
                      size='small'
                      variant='text'
                      color='error'
                      onClick={onCancelUpdateComment}
                      sx={{ fontSize: '12px' }}
                    >
                      취소
                    </Button>
                  </Box>
                </Box>
              ) : (
                /* 2. 일반 댓글 표시 모드 */
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 44 }}>
                      <Avatar sx={{ width: 32, height: 32 }} src={item.author.imageUrl}>
                        <CloudIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant='subtitle2' sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                          {item.author.name}
                        </Typography>
                        <Typography variant='caption' sx={{ ml: 1.5, color: '#b5b5b5', fontSize: '12px' }}>
                          {dayjs(item.datetime).format('YYYY.MM.DD HH:mm')}
                        </Typography>
                      </Box>
                      <Typography
                        variant='body2'
                        sx={{ whiteSpace: 'pre-wrap', color: 'text.primary', lineHeight: 1.6 }}
                      >
                        {item.content}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 수정/삭제 버튼 (본인일 경우) */}
                  {user?.id === item.authorId && (
                    <Box sx={{ textAlign: 'end' }}>
                      <Button
                        size='small'
                        variant='text'
                        color='inherit'
                        onClick={() => onClickModifyButton(item.id, item.content)}
                        sx={{ fontSize: '12px' }}
                      >
                        수정
                      </Button>
                      <Button
                        size='small'
                        variant='text'
                        color='error'
                        onClick={() => onDeleteComment(item.id)}
                        sx={{ fontSize: '12px' }}
                      >
                        삭제
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </ListItem>
            <Divider variant='fullWidth' component='li' />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
