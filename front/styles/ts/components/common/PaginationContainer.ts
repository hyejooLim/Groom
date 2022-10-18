import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  /* 숫자 */
  .ant-pagination-item {
    border: none;
    background-color: transparent;
  }

  & a {
    font-family: 'Courier New', Courier, monospace;
    font-size: 15px;
  }

  & .ant-pagination-item-active a {
    color: #07a;
  }

  & .ant-pagination-item a:hover {
    color: #07a;
  }
`;
