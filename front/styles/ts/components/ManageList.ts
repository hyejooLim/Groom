import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  background-color: #fff;
  height: 258px;
  font-family: Noto Sans Regular, AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
`;

export const LinkWrapper = styled.div`
  border-bottom: 1px solid #f1f3f6;
  padding: 14px 10px;

  :hover {
    cursor: pointer;
    background-color: #fafbfd;
  }

  .link_menu {
    color: #ff5544;
    font-size: 17px;

    & span {
      margin-left: 10px;
    }
  }
`;

export const WrapMenu = styled.div`
  & div {
    font-size: 17px;
    font-weight: 600;
    padding: 14px 10px 5px;

    & span {
      margin-left: 10px;
    }
  }
`;

export const ListWrapper = styled.ul`
  margin-left: 25px;
  display: flex;
  flex-direction: column;

  & li {
    margin: 8px 0 0 8px;

    & a {
      color: #000;
      margin-left: 14px;

      :hover {
        color: #ff5544;
      }
    }
  }
`;
