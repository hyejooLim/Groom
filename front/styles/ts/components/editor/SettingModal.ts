import styled from 'styled-components';
import { Menu } from 'antd';

export const HeadLayer = styled.div`
  border-bottom: 2px solid #000;

  ::after {
    display: block;
    clear: both;
    content: '';
  }

  .head_layer_title {
    float: left;
    padding: 0 0 12px;
    font-weight: 400;
    font-size: 18px;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
    color: #000;
  }
`;

export const PublicInfoBox = styled.div`
  display: none;
  width: 186px;
  height: 32px;
  padding: 6px 11px;
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);
  font-size: 13px;
  top: 30px;
  left: -10px;
  color: #5e5e5e;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 13px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -5px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
`;

export const PrivateInfoBox = styled.div`
  display: none;
  width: 200px;
  height: 32px;
  padding: 6px 11px;
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);
  font-size: 13px;
  top: 30px;
  left: -10px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 13px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -5px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
`;

export const BodyLayer = styled.div`
  dl {
    margin: 0;
    display: flex;
    align-items: center;
  }

  dt {
    width: 70px;
    padding: 0;
    height: 19px;
    line-height: 20px;
    float: left;
    font-size: 15px;
    color: #000;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
  }

  dd {
    display: block;
    float: left;
    position: relative;
    width: 790px;
    color: #333;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .publish_editor {
    position: relative;
    padding: 32px 0 0;
    min-height: 176px;

    & .post_title {
      display: -webkit-box;
      overflow: hidden;
      max-height: 96px;
      margin: 0 0 14px;
      padding: 0 220px 0 0;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.5px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }

    & .editor_info {
      height: 65px;
      padding: 22px 0 23px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
    }

    & .default {
      & .radio_public:hover {
        ${PublicInfoBox} {
          display: block;
        }
      }

      & .radio_private:hover {
        ${PrivateInfoBox} {
          display: block;
        }
      }
    }

    & .publishedAt {
      & .date_btn:not(:first-child) {
        position: relative;
        margin: 0 0 0 23px;

        & span::before {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 1px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.1);
          content: '';
        }
      }

      & .date_btn {
        overflow: visible;
        float: left;
        padding: 0 0 0 2px;
        background-color: #fff;
        color: #909090;
      }

      & .date_btn.on {
        color: #111;
      }

      & .current {
        padding: 0;
      }

      & .createdAt {
        padding: 0;
        transition: none;
      }

      & dt.disabled,
      .createdAt.disabled {
        color: #ddd;
        transition: none;
      }
    }

    & .url > * {
      color: #ddd;
    }
  }
`;

export const FootLayer = styled.div`
  .btn_wrapper {
    padding: 30px 0 0;
    font-size: 0;
    line-height: 0;
    text-align: center;

    .btn {
      width: 150px;
      margin: 0 4px;
      height: 40px;
      border: 1px solid #9c9c9c;
      border-radius: 20px;
      font-size: 13px;
      transition: border-color 0.2s, color 0.2s, background-color 0.2s;
    }

    .cancel {
      width: 88px;
    }

    .submit {
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
    }

    .btn:not([disabled]):focus,
    .btn:not([disabled]):hover {
      border-color: #f54;
      color: #fff;
      background-color: #f54;
    }
  }
`;

export const OverrideMenu = styled(Menu)`
  width: 104px;
  z-index: 100;
  margin-top: 8px;
  padding: 0;

  & .ant-dropdown-menu-item {
    display: inline-block;
    width: 100%;
    font-size: 13px;
    padding: 7px 4px 7px 16px;
  }

  & .ant-dropdown-menu-item:first-child {
    margin-top: 8px;
  }

  & .ant-dropdown-menu-item:last-child {
    margin-bottom: 8px;
  }
`;

export const DropdownWrapper = styled.div`
  float: right;

  & button {
    color: #909090;
  }

  & .dropdown_label {
    font-size: 13px;
    margin-right: 4px;
  }

  & .dropdown_icon {
    font-size: 10px;
  }
`;
