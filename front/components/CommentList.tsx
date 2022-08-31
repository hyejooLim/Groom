import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Comment, List, Button } from 'antd';

import useGetUser from '../hooks/query/useGetUser';
import useGetComments from '../hooks/query/useGetComments';
import useUpdateComment from '../hooks/query/useUpdateComment';
import useDeleteComment from '../hooks/query/useDeleteComment';
import { CommentItem } from '../types';
import { CommentBox, ButtonWrapper, StyledForm, StyledTextArea } from '../styles/ts/components/CommentList';

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
    try {
      if (!currentComment.content || !currentComment.content.trim()) {
        alert('내용을 입력해 주세요.');
        return;
      }

      updateComment.mutate({ data: { id: currentComment.id, content: currentComment.content } });

      setTimeout(() => {
        setCurrentComment(null);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }, [currentComment]);

  const onCancelUpdateComment = useCallback(() => {
    setCurrentComment(null);
  }, []);

  const onDeleteComment = useCallback((id: number) => {
    deleteComment.mutate(id);
  }, []);

  return (
    <List
      dataSource={comments}
      header={`${comments?.length}개의 댓글`}
      itemLayout='horizontal'
      renderItem={(item: CommentItem) => {
        return item.id === currentComment?.id ? (
          <StyledForm onFinish={onUpdateComment}>
            <StyledTextArea
              value={currentComment.content}
              onChange={onChangeContent}
              autoSize={{ minRows: 3, maxRows: 3 }}
              autoFocus
            />
            <ButtonWrapper>
              <Button className='submit btn' htmlType='submit'>
                완료
              </Button>
              <Button className='cancel btn' onClick={onCancelUpdateComment}>
                취소
              </Button>
            </ButtonWrapper>
          </StyledForm>
        ) : (
          <CommentBox>
            <Comment
              author={item.author?.name}
              content={item.content}
              datetime={<span style={{ marginLeft: '10px', fontSize: '13px' }}>{dayjs().format('YYYY.MM.DD')}</span>}
            />
            {user?.id === item.authorId && (
              <ButtonWrapper>
                <Button className='modify btn' onClick={() => onClickModifyButton(item.id, item.content)}>
                  수정
                </Button>
                <Button className='delete btn' onClick={() => onDeleteComment(item.id)}>
                  삭제
                </Button>
              </ButtonWrapper>
            )}
          </CommentBox>
        );
      }}
    ></List>
  );
};

export default CommentList;
