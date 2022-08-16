import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  .card_meta {
    display: flex;
    justify-content: space-between;

    .ant-card-meta {
      .ant-card-meta-title {
        font-size: 14px;
      }

      .ant-card-meta-description {
        font-size: 12px;
      }
    }

    .logout_btn {
      padding: 0;
      width: 58px;
      height: 24px;
      font-size: 12px;
      background-color: #fff;
      color: #13a085;
    }
  }

  .ant-card-body {
    padding: 18px;

    .ant-card-meta-detail > div:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;
