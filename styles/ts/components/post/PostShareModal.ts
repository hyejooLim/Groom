import { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = HTMLAttributes<HTMLDivElement>;

export const LabelContainer = styled.div<Props>`
  width: 352px;
  height: 46px;
  overflow-x: auto;
  background-color: #eee;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 30px;
  padding: 0 8px;
  border: 1px solid #333;

  & .icon_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    & .icon {
      font-size: 24px;
    }
  }

  & .label {
    min-width: 80px;
    max-width: 160px;
    height: 30px;
    border-radius: 30px;
    margin-right: 4px;
    color: #fff;
    background-color: #13a085;
    display: flex;
    align-items: center;
    justify-content: center;

    & .icon {
      font-size: 16px;
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

export const DropdownWrapper = styled.div`
  width: 125px;
  height: 23px;
  font-family: "Nanum Godic";

  & .list_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    & .icon {
      font-size: 24px;
      margin-left: 5px;
    }
  }

  & .dropdown {
    display: none;
  }

  & .dropdown.isShow {
    display: block;
    width: 125px;
    max-width: 125px;
    color: #333;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);

    & .all_share {
      padding: 6px 4px 4px 4px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
    }

    & .item_list {
      max-height: 224px;
      overflow-y: auto;

      & .item_wrapper {
        padding: 8px;
        display: flex;
        align-items: center;
        cursor: pointer;

        & .name {
          width: 65px;
          margin-left: 8px;
          text-align: left;
          display: block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
`;

export const ShareButtonWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  & .share_btn {
    width: 100px;
    height: 40px;
    color: #fff;
    background-color: #13a085;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover,
    &:focus {
      color: #fff;
      background-color: #0fc19e;
    }

    &:disabled {
      background-color: #ddd;
    }
  }
`;
