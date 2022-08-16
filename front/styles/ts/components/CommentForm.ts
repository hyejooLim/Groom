import styled from 'styled-components';
import { Button, Input } from 'antd';

export const AddCommentButton = styled(Button)`
  border: 0;
  float: right;
  font-size: 18px;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 10px;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

export const StyledTextArea = styled(Input.TextArea)`
  width: 100%;
  font-size: 15px;
  border: 1px solid #ddd;
  line-height: 160%;
`;
