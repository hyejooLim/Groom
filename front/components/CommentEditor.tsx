import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

const AddCommentButton = styled(Button)`
  border: 0;
  float: right;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 10px;
  background-color: transparent;
  cursor: pointer;
`;

interface CommentEditorProps {
  loading: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

const CommentEditor: FC<CommentEditorProps> = ({ loading, value, onChange, onSubmit }) => {
  return (
    <>
      <Form.Item>
        <TextArea
          style={{ width: '100%', fontSize: '15px' }}
          rows={6}
          onChange={onChange}
          value={value}
          placeholder='댓글을 입력해 주세요.'
        />
      </Form.Item>
      <Form.Item>
        <AddCommentButton htmlType='submit' loading={loading} onClick={onSubmit} type='primary'>
          Write
        </AddCommentButton>
      </Form.Item>
    </>
  );
};

export default CommentEditor;
