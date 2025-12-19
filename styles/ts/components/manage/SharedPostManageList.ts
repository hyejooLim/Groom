import { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = HTMLAttributes<HTMLDivElement>;

export const ButtonWrapper = styled.div`
  float: right;
  position: absolute;
  right: 16px;

  & .btn {
    display: none;
    width: 140px;
    height: 28px;
    margin-right: 4px;
    font-size: 12px;
    color: #333;
    border: 1px solid #c5cdd7;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
    background-color: #fff;

    :hover {
      border-color: #808080;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
  }
`;

export const PostInfo = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 13px 16px 12px;
  font-size: 14px;
  border-bottom: 1px solid #f1f3f6;

  & .info_area {
    width: 480px;
  }

  &:hover {
    background-color: #fafbfd;

    ${ButtonWrapper} {
      .btn {
        display: inline-block;
      }
    }
  }

  .post_title a {
    margin-right: 5px;
    font-size: 16px;

    :hover {
      text-decoration: underline;
      color: inherit;
      cursor: pointer;
    }
  }

  .post_extra_info {
    & a {
      color: #ff5544;
    }

    & span:not(:first-child) {
      color: #808080;

      :before {
        display: inline-block;
        width: 2px;
        height: 2px;
        margin: 11px 8px 0;
        border-radius: 2px;
        background: #c5cdd7;
        vertical-align: top;
        content: "";
      }
    }
  }
`;

export const SharerNames = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: 218px; */

  & .name {
    margin-left: 4px;
    color: #555;
  }

  & .arrow_icon {
    margin: 0 5px;
    color: #3b3bc8;
  }
`;
