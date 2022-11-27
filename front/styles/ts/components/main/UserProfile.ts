import styled from 'styled-components';
import { Button } from 'antd';

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
      color: red;
      position: relative;
      top: 3.4px;
    }
  }
`;

export const NewBox = styled.div`
  display: flex;
  font-size: 14px;

  .posts {
    margin-right: 12px;
    color: #000;
  }

  .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.16);
    display: inline-block;
    margin: 0 8px -1px 8px;
  }
`;

export const LogoutButton = styled(Button)`
  background-color: #13a085;
  color: #fff;
  width: 70px;
  height: 32px;
  font-size: 13px;
  border-radius: 8px;
  margin-top: 10px;
  padding: 0;

  :hover {
    cursor: pointer;
    background-color: #20b79a;
    color: #fff;
  }

  :focus {
    background-color: #13a085;
    color: #fff;
  }
`;
