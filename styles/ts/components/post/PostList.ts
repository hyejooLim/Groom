import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all;
  height: 470px;

  & ul {
    border-top: 1px dotted #ddd;

    & li {
      padding: 14px 10px 13px;
      border-bottom: 1px dotted #ddd;
      font-size: 16px;

      a:hover {
        color: #07a;
      }
    }
  }

  & .loader {
    line-height: 432px;
    text-align: center;
  }

  @media (max-width: 420px) {
    height: 556px;

    & ul {
      & li {
        padding: 8px 10px;
        height: 64px;
        font-size: 15px;
      }
    }
  }
`;

export const PostInfo = styled.div`
  float: right;
  font-size: 14px;

  & span {
    color: #666;
  }

  @media (max-width: 420px) {
    position: absolute;
    font-size: 12px;
  }
`;
