import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Comment, List, Avatar } from 'antd';
import dayjs from 'dayjs';

import { CommentItem } from '../types';

const CommentBox = styled.li`
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 8px 7px 8px -1px #d3d3d3;
`;

interface CommentListProps {
  comments: CommentItem[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length}개의 댓글`}
      itemLayout='horizontal'
      style={{ marginTop: 100 }}
      renderItem={(item: CommentItem) => (
        <CommentBox>
          <Comment
            author={
              <Link href={`/user/${item.User.id}`}>
                <a style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }}>{item.User.name}</a>
              </Link>
            }
            content={item.content}
            datetime={<span style={{ float: 'right', fontSize: '14px' }}>{dayjs().format('YYYY.MM.DD')}</span>}
          />
        </CommentBox>
      )}
    ></List>
  );
};

export default CommentList;
