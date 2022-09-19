import styled from 'styled-components';
import { Input } from 'antd';

export const CategoryManageListWrapper = styled.div`
  .set_order {
    margin: 21px 0 30px;
    padding: 8px;
    border-radius: 1px;
    background: #e7edf3;

    .wrap_order {
      position: relative;
    }
  }
`;

export const EditButton = styled.div`
  display: flex;

  .btn {
    display: none;
    font-size: 12px;
    width: 40px;
    height: 26px;
    border: 1px solid #c5cdd7;
    background-color: #fff;
  }

  .btn:enabled {
    color: #333;

    :hover {
      border-color: #a4adba;
      box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 12%);
    }
  }

  .modify {
    margin-right: 5px;
  }

  .delete:not(:enabled) {
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;

    :hover {
      background-color: inherit;
      border-color: #e0e5ee;
      color: #959595;
      box-shadow: none;
    }
  }
`;

export const DragIconWrapper = styled.div`
  margin: 6px 8px 0 -10px;
  padding: 10px;
  color: #bbb;

  :hover {
    cursor: move;
  }
`;

export const ItemWrapper = styled.div`
  padding: 0 19px;
  height: 52px;
  border: 1px solid #e0e5ee;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid #808080;

    ${EditButton} {
      .btn {
        display: block;
      }
    }

    ${DragIconWrapper} {
      color: #808080;
    }
  }

  &.drop_zone {
    border-bottom: 3px solid #ff0000;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .category_name {
    width: 320px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    & span:first-child {
      font-size: 18px;
    }
  }
`;

export const StyledInput = styled(Input)`
  width: 330px;
  height: 40px;
  font-size: 18px;

  .ant-input:focus {
    border-color: none;
    box-shadow: none;
  }
`;

export const FormButton = styled.div`
  display: flex;
  align-items: center;

  .btn {
    width: 80px;
    height: 32px;
    font-size: 13px;
    border: 1px solid #c5cdd7;
  }

  .cancel {
    margin-right: 5px;
    color: #333;
    background: #fff;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #a5adba;
      box-shadow: 0 2px 3px rgb(0 0 0 / 12%);
    }
  }

  .submit:not(:enabled) {
    background: #fff;
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;
  }

  .submit:enabled {
    color: #fff;
    background: #333;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      background: #505050;
      box-shadow: 0 2px 5px rgb(0 0 0 / 12%);
    }
  }
`;

export const AddCategoryWrapper = styled.div`
  height: 50px;
  margin-top: 8px;
  padding: 3px 20px;
  line-height: 48px;
  font-size: 16px;
  border: 1px dotted #acb3bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border: 1px dotted #888;
    cursor: pointer;
  }

  .add_category_text {
    margin-left: 14px;
  }
`;

export const TotalCount = styled.div`
  float: right;
  color: #959595;
  font-size: 12px;
`;
