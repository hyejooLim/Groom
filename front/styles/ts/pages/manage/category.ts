import styled from 'styled-components';
import { Button } from 'antd';

export const ManageCategoryWrapper = styled.div`
  font-size: 14px;
  background: #fff;
  border-radius: 1px;
  border: 1px solid #e0e5ee;
  padding: 25px 29px 0;
  margin-top: 8px;

  .set_btn {
    margin: 0 -29px;
    padding: 14px 29px;
    border-top: 1px px solid #f1f3f6;
    background: #fafbfc;
    display: flex;
    justify-content: flex-end;
  }
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .desc_text {
    line-height: 60%;

    .info {
      font-size: 13px;
      color: #808080;
    }
  }
`;

export const SaveDiffButton = styled(Button)`
  width: 140px;
  height: 38px;
  border: 1px solid #333;

  &:not(:enabled) {
    background-color: #fff;
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;

    :hover {
      background-color: #fff;
      border-color: #e0e5ee;
      color: #959595;
      box-shadow: none;
    }
  }

  &:enabled {
    color: #fff;
    background: #333;
    border-radius: 1px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #505050;
      background: #505050;
      box-shadow: 0 2px 5px rgb(0 0 0 / 23%);
    }
  }
`;

export const TotalCount = styled.div`
  float: right;
  color: #959595;
  font-size: 12px;

  & span {
    color: #333;
  }
`;
