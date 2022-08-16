import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all; // ?
  height: 430px;

  & ul {
    border-top: 1px dotted #ddd;

    & li {
      padding: 12px 10px 9px;
      border-bottom: 1px dotted #ddd;

      a:hover {
        color: #07a;
      }
    }
  }
`;

export const PostInfo = styled.div`
  float: right;
  font-size: 13px;

  & span {
    color: #666;
  }
`;
