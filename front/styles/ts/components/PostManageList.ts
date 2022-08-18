import styled from 'styled-components';

export const PostButton = styled.div`
  float: right;

  .btn {
    display: none;
    width: 40px;
    height: 24px;
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

  .subscribe_cancel {
    width: 85px;
    height: 30px;
    font-size: 13px;
  }
`;

export const ListWrapper = styled.div`
  background-color: #fff;
  margin-top: 8px;
  line-height: 180%;
  word-break: break-all; // ?
  height: 386px;
  border: 1px solid #e0e5ee;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px 12px;
  font-size: 14px;
  border-bottom: 1px solid #f1f3f6;

  &:hover {
    background-color: #fafbfd;

    ${PostButton} {
      .btn {
        display: inline-block;
      }
    }
  }

  .post_title a {
    margin-right: 5px;
    font-size: 15px;

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
        content: '';
      }
    }
  }
`;
