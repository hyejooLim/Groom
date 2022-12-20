import styled from 'styled-components';
import { Button } from 'antd';

export const ListWrapper = styled.div`
  background-color: #fff;
  margin-top: 8px;
  line-height: 180%;
  word-break: break-all;
  height: 383px;
  border: 1px solid #e0e5ee;

  & .loader {
    line-height: 383px;
    text-align: center;
  }
`;

export const NeighborCancelButton = styled(Button)`
  float: right;
  display: none;
  width: 70px;
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
`;

export const NeighborInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px 12px;
  border-bottom: 1px solid #f1f3f6;

  &:hover {
    background-color: #fafbfd;

    ${NeighborCancelButton} {
      display: inline-block;
    }
  }

  & .neighbor_info {
    display: flex;
    align-items: center;

    & .neighbor_info_text {
      margin-left: 16px;

      & .neighbor_title {
        .name {
          font-size: 16px;
        }

        .email {
          margin-left: 14px;
          color: #888;
        }
      }

      & .neighbor_sub {
        color: #808080;

        & span:not(:first-child) {
          :before {
            display: inline-block;
            width: 2px;
            height: 2px;
            margin: 11px 8px 0;
            border-radius: 2px;
            background: #c5cdd7;
            vertical-align: top;
            content: '';
          }
        }
      }
    }
  }
`;

export const EmptyBox = styled.div`
  color: #959595;
  text-align: center;
  box-sizing: border-box;
  padding: 140.4px 0;

  .icon_wrapper {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto 17px;
    padding-top: 16px;
    border-radius: 80px;
    background: #d0d0d0;
    box-sizing: border-box;

    .icon {
      display: block;
      width: 27px;
      height: 27px;
      margin: 0 auto;
      background-position: -260px 0;
      color: #fff;
    }
  }
`;
