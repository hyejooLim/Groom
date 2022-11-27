import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { BsCloudFill } from 'react-icons/bs';
import { Comment, List, Button, Avatar } from 'antd';
import dayjs from 'dayjs';

import { useGetUser } from '../../hooks/query/user';
import useGetComments from '../../hooks/query/comments';
import { useUpdateComment, useDeleteComment } from '../../hooks/query/comment';
import { CommentItem } from '../../types';
import * as S from '../../styles/ts/components/comment/CommentList';

interface CommentListProps {
  postId: number;
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const { data: user } = useGetUser();

  const { data: comments } = useGetComments(postId);
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const [currentComment, setCurrentComment] = useState<CommentItem>(null);

  const onClickModifyButton = useCallback(
    (id: number, content: string) => {
      setCurrentComment({
        ...currentComment,
        id,
        content,
      });
    },
    [currentComment]
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentComment({
        ...currentComment,
        content: e.target.value,
      });
    },
    [currentComment]
  );

  const onUpdateComment = useCallback(() => {
    if (!currentComment.content || !currentComment.content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    }

    updateComment.mutate({ data: { id: currentComment.id, content: currentComment.content } });

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

    deleteComment.mutate(id);
  }, []);

  return (
    <List
      dataSource={comments}
      header={`${comments?.length}개의 댓글`}
      itemLayout='horizontal'
      renderItem={(item: CommentItem) => {
        return item.id === currentComment?.id ? (
          <S.StyledForm onFinish={onUpdateComment}>
            <S.StyledTextArea
              value={currentComment.content}
              onChange={onChangeContent}
              autoSize={{ minRows: 3, maxRows: 3 }}
              autoFocus
            />
            <S.ButtonWrapper>
              <Button className='submit btn' htmlType='submit'>
                완료
              </Button>
              <Button className='cancel btn' onClick={onCancelUpdateComment}>
                취소
              </Button>
            </S.ButtonWrapper>
          </S.StyledForm>
        ) : (
          <S.CommentBox>
            <Comment
              avatar={
                <Avatar
                  size={40}
                  icon={<BsCloudFill style={{ height: '40px', lineHeight: '40px' }} />}
                  src={user?.imageUrl}
                />
              }
              author={<span style={{ fontSize: '14px' }}>{item.author?.name}</span>}
              content={<p style={{ whiteSpace: 'pre-wrap' }}>{item.content}</p>}
              datetime={
                <span style={{ marginLeft: '10px', fontSize: '13px' }}>
                  {dayjs(item.datetime).format('YYYY.MM.DD HH:mm')}
                </span>
              }
            />
            {user?.id === item.authorId && (
              <S.ButtonWrapper>
                <Button className='modify btn' onClick={() => onClickModifyButton(item.id, item.content)}>
                  수정
                </Button>
                <Button className='delete btn' onClick={() => onDeleteComment(item.id)}>
                  삭제
                </Button>
              </S.ButtonWrapper>
            )}
          </S.CommentBox>
        );
      }}
    ></List>
  );
};

export default CommentList;
