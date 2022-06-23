import React from 'react';
import { Comment, List } from 'antd';
import styled from 'styled-components';

import { CommentItem } from '../types';

const CommentList = ({ comments }: { comments: CommentItem[] }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length}개의 댓글`}
      itemLayout='horizontal'
      renderItem={(props) => <Comment {...props} />}
      style={{ marginTop: 20, border: '1px solid #e3e3e3' }}
    />
  );
};

export default CommentList;
