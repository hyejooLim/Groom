import React, { FC } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Comment, List } from 'antd';

import { CommentItem } from '../types';
import { CommentBox } from '../styles/ts/components/CommentList';

interface CommentListProps {
  comments: CommentItem[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length}개의 댓글`}
      itemLayout='horizontal'
      renderItem={(item: CommentItem) => (
        <CommentBox>
          <Comment
            author={
              <Link href={`/user/${item.author.id}`}>
                <a>{item.author.name}</a>
              </Link>
            }
            content={item.content}
            datetime={<span style={{ marginLeft: '10px', fontSize: '13px' }}>{dayjs().format('YYYY.MM.DD')}</span>}
          />
        </CommentBox>
      )}
    ></List>
  );
};

export default CommentList;
