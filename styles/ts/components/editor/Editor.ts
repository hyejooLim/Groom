import styled from "styled-components";
import { Button } from "antd";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const EditorWrapper = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 944px;
`;

export const ContentAside = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66px;
  background-color: #f5f5f5;
  min-width: 944px;
  text-align: right;

  .btn_wrapper {
    float: right;
    padding: 13px 54px 0 0;
    display: flex;

    .btn {
      height: 40px;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      margin: 0 4px;
      transition: border-color 0.2s, color 0.2s, background-color 0.2s;
    }

    .temp_save {
      width: 122px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .btn_wrapper .count:before {
    content: "";
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.09);
    display: inline-block;
    margin: 0 9px -1px 9px;
  }
`;

export const CompleteButton = styled(Button)`
  color: #fff;
  background-color: #000;
  border: 1px solid #000;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not([disabled]):focus,
  &:not([disabled]):hover {
    border-color: #f54;
    color: #fff;
    background-color: #f54;
  }
`;
