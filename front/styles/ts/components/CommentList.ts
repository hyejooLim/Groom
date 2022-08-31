import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

export const CommentBox = styled.li`
  padding: 5px 20px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 8px 7px 8px -1px #d3d3d3;
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled(Button)`
  .btn {
    font-size: 12px;
  }

  .modify,
  .submit {
    margin-right: 7px;

    &:hover {
      color: #004dff;
    }
  }

  .delete:hover,
  .cancel:hover {
    color: #ff3f3f;
  }
`;

export const StyledForm = styled(Form)`
  padding: 5px 20px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 8px 7px 8px -1px #d3d3d3;
  display: flex;
  justify-content: space-between;
`;

export const StyledTextArea = styled(Input.TextArea)`
  border: none;
  padding: 12px 0;
`;
