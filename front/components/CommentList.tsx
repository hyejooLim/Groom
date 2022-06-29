import React, { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Comment, List } from 'antd';
import dayjs from 'dayjs';

import { CommentItem } from '../types';

const CommentBox = styled.li`
  padding: 5px 20px;
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
      renderItem={(item: CommentItem) => (
        <CommentBox>
          <Comment
            author={
              <Link href={`/user/${item.User.id}`}>
                <a>{item.User.name}</a>
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
