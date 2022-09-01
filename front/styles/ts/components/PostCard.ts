import styled from 'styled-components';
import { Button } from 'antd';

export const HeadWrapper = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;

export const Date = styled.div`
  position: absolute;
  bottom: -44px;
  left: -10px;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  background-color: #555;
  cursor: default;

  ::before {
    position: absolute;
    top: 0;
    left: -6px;
    width: 0;
    height: 0;
    content: ' ';
    border-top: 20px solid #555;
    border-left: 6px solid transparent;
  }

  ::after {
    position: absolute;
    bottom: 0;
    left: -6px;
    width: 0;
    height: 0;
    content: ' ';
    border-bottom: 20px solid #555;
    border-left: 6px solid transparent;
  }

  @media (max-width: 959px) {
    bottom: -10px;
    right: 0;
    left: inherit;
    padding: 8px 5px 6px;
    font-size: 11px;
  }
`;

export const ContentWrapper = styled.div`
  padding: 50px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all;

  .tag_label {
    padding: 0 0 10px 70px;
    min-height: 31px;
    line-height: 100%;
    text-align: right;
    word-break: break-word;

    a {
      margin-right: 8px;
      font-size: 13px;
      color: #777;

      &:hover {
        color: #000;
      }
    }
  }
`;

export const PostButton = styled(Button)`
  margin-top: 50px;
  background-color: transparent;
  width: 80px;
  height: 32px;
  border: 1px solid rgba(185, 185, 185, 0.5);
  border-radius: 16px;
  line-height: 30px;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;

  :hover {
    border-color: rgba(185, 185, 185, 0.5);
    color: inherit;
  }
`;

export const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;

  .btn {
    width: 70px;
    color: #777;
    background-color: transparent;
    font-size: 14px;
    font-family: 'Courier New';

    :hover {
      color: #e55;
    }
  }

  .line {
    padding: 0 5px;
    font-size: 9px;
    color: #ddd;
  }
`;
