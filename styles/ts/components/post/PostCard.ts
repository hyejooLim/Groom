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

export const Author = styled.div`
  position: absolute;
  bottom: 10px;
  right: 18px;

  & .icon {
    font-size: 20px;
    margin-right: 8px;
    position: relative;
    bottom: -5px;
    cursor: pointer;
  }

  & .groom {
    color: #fff;
    cursor: default;
  }

  & span {
    font-size: 16px;
    font-family: 'Courier New', Courier, monospace;
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

  &.share {
    width: 40px;
    font-size: 15px;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }

  :hover {
    border-color: rgba(185, 185, 185, 0.5);
    color: inherit;
  }

  :focus {
    border-color: rgba(185, 185, 185, 0.5);
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
    font-size: 15px;
    font-family: 'Courier New';

    :hover {
      color: #e55;
    }
  }

  .modify:hover {
    color: #2587ff;
  }

  .line {
    padding: 0 5px;
    font-size: 9px;
    color: #ddd;
  }
`;

export const ButtonWrapper = styled.div`
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;

  & div {
    width: 400px;
    display: flex;
    justify-content: space-between;

    & .button {
      border: 1px solid #999;
      border-radius: 20px;
      margin-top: 20px;
      width: 160px;
      height: 42px;
      color: #333;
      background-color: #f5f5f5;
      transition: color 0.6s;
      transition: background-color 0.6s;
      display: flex;
      justify-content: center;
      align-items: center;

      & .icon {
        font-size: 16px;
      }

      & .prev {
        margin-right: 16px;
      }

      & .next {
        margin-left: 16px;
      }

      &:focus {
        border-color: #999;
      }

      &:not(:disabled):hover {
        color: #fff;
        background-color: #13a085;
        border: none;
      }

      &:disabled {
        background: inherit;
        color: rgba(0, 0, 0, 0.25);
        border-color: #d9d9d9;

        & polyline {
          stroke: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
`;
