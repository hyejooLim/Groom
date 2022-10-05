import styled from 'styled-components';
import { Card } from 'antd';

export const CameraButton = styled.label`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 50px;
  height: 50px;
  margin: -50px 0 0 -25px;
  cursor: pointer;

  &::after {
    border-radius: 30px;
    background: rgba(51, 51, 51, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    content: '';
  }

  .icon {
    font-size: 26px;
    color: #fff;
    position: absolute;
    top: 10px;
    left: 13px;
    z-index: 11;
  }

  .edit_btn {
    display: none;
  }
`;

export const RemoveButton = styled.label`
  display: none;
  position: absolute;
  top: -1px;
  left: 219px;
  z-index: 10;
  width: 20.31px;
  height: 20.31px;
  cursor: pointer;
  background-color: #fff;

  & .icon {
    font-size: 26px;
    z-index: 11;
    position: absolute;
    top: -3px;
    left: -3px;
  }
`;

export const StyledCard = styled(Card)`
  .ant-card-cover {
    &:hover {
      ${CameraButton} {
        display: block;
      }

      & .show {
        display: block;
      }
    }
  }

  .ant-card-body {
    padding: 20px;

    .card_meta {
      display: flex;
      justify-content: space-between;

      .ant-card-meta {
        .ant-card-meta-title {
          font-size: 16px;
        }

        .ant-card-meta-description {
          font-size: 14px;
        }
      }

      .logout_btn {
        padding: 0;
        width: 58px;
        height: 24px;
        font-size: 13px;
        background-color: #fff;
        color: #13a085;

        & :hover {
          text-decoration: underline;
        }
      }
    }

    .ant-card-meta-detail > div:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

export const EmptyProfile = styled.div`
  height: 200px;
  text-align: center;
  line-height: 268px;

  & > * {
    font-size: 60px;
    color: #999;
  }
`;
