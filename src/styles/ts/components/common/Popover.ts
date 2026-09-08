import { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = HTMLAttributes<HTMLDivElement>;

export const PopoverWrapper = styled.div<Props>`
  position: absolute;
  background-color: #fff;
  padding: 10px 0;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);

  &.isShow {
    visibility: visible;
  }

  &:not(.isShow) {
    visibility: hidden;
  }

  &::before {
    content: "";
    border-top: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    left: 13px;
    top: 116px;
    z-index: 2;
  }

  &::after {
    content: "";
    border-top: 6px solid #999;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    left: 13px;
    top: 117px;
  }

  & div {
    width: 100%;
    padding: 7px 18px;
    font-family: "Noto Sans DemiLight", AppleSDGothicNeo, "Malgun Gothic",
      "맑은 고딕", "돋움", dotum, sans-serif !important;
    line-height: 16px;
    color: #333;
    text-align: left;
    box-sizing: border-box;
    text-decoration: none;

    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .icon {
      margin-right: 8px;
    }
  }
`;
