import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Comment, List } from 'antd';

import { CommentItem } from '../types';
import useGetComments from '../hooks/query/useGetComments';
import { CommentBox } from '../styles/ts/components/CommentList';

interface CommentListProps {
  postId: number;
}

const CommentList: FC<CommentListProps> = ({ postId }) => {
  const { data: comments } = useGetComments(postId);

  return (
    <List
      dataSource={comments}
      header={`${comments?.length}개의 댓글`}
      itemLayout='horizontal'
      renderItem={(item: CommentItem) => (
        <CommentBox>
          <Comment
            author={item.author?.name}
            content={item.content}
            datetime={<span style={{ marginLeft: '10px', fontSize: '13px' }}>{dayjs().format('YYYY.MM.DD')}</span>}
          />
        </CommentBox>
      )}
    ></List>
  );
};

export default CommentList;
