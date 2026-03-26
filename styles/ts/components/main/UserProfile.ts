import styled from 'styled-components';
import Button from '@mui/material/Button';

export const UserProfileWrapper = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 24px 0;
`;

export const UserInfo = styled.div`
  margin-left: 30px;
`;

export const InfoBox = styled.div`
  margin-bottom: 20px;

  & span {
    color: #000;
    font-size: 18px;
    font-weight: 600;
  }

  & .go_to_write {
    margin-left: 10px;
    font-size: 22px;

    * {
      color: #f75037;
      position: relative;
      top: 3.4px;
      transition: all 0.2s ease-in;
    }

    &:hover * {
      color: #f78a7a;
    }
  }
`;

export const NewBox = styled.div`
  color: #000;
  display: flex;

  .posts,
  .neighbors {
    display: flex;
    align-items: center;
  }

  .posts {
    margin-right: 12px;
  }

  .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.16);
    display: inline-block;
    margin: 0 6px -1px 6px;
  }
`;

export const LogoutButton = styled(Button)`
  background-color: #13a085 !important;
  color: #fff !important;

  :hover {
    background-color: #20b79a !important;
  }
`;
