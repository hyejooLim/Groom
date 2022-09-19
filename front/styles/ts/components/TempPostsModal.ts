import styled from 'styled-components';

export const InfoBoxWrapper = styled.div`
  display: none;
  width: 287px;
  height: 60px;
  padding: 9px 11px;
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);
  font-size: 12px;
  top: 33px;
  left: -2px;

  ::after {
    content: '';
    display: block;
    position: absolute;
    left: 13px;
    width: 12px;
    height: 12px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -7px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
`;

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
    font-size: 16px;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
    color: #000;
  }

  .head_layer_info {
    float: left;
    position: relative;

    &:hover {
      ${InfoBoxWrapper} {
        display: block;
      }
    }

    .info_icon {
      margin: 3px 0 0 8px;
      display: block;
      width: 17px;
      height: 17px;
      background-position: -60px 0;
    }
  }
`;

export const ItemInfoWrapper = styled.div`
  position: absolute;
  z-index: 1;
  border-radius: 1px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 1px 0 rgb(0 0 0 / 30%), 0 2px 5px 0 rgb(0 0 0 / 10%);

  .item_info {
    display: block;
    display: -webkit-box;
    overflow: hidden;
    max-height: 60px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
    font-size: 13px;
    line-height: 20px;
    color: #777;
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: -7px;
    left: 13px;
    width: 12px;
    height: 12px;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const RemoveButton = styled.button`
  display: none;
  height: 13px;
  padding: 0;

  .trash_icon {
    width: 13px;
    height: 13px;
    vertical-align: top;
    margin: 3px 0 0 5px;
  }
`;

export const BodyLayer = styled.div`
  .list_container {
    overflow: auto;
    height: 387px;
    border-bottom: 1px solid #f0f0f0;

    .empty {
      text-align: center;
      margin: 183px auto;
      color: #909090;
      font-weight: 300;
      font-size: 14px;
    }

    .list_wrapper {
      overflow: auto;

      .list {
        padding: 14px 0 24px;
        box-sizing: border-box;

        .list_item {
          padding: 14px 0 0;
          font-size: 13px;

          ::after {
            display: block;
            clear: both;
            content: '';
          }

          & dt {
            float: left;
            width: 96px;
            padding: 2px 0 0;
            line-height: 18px;
            font-family: Avenir Next, Noto Sans DemiLight, AppleSDGothicNeo-Regular, Malgun Gothic, dotum, sans-serif;
            color: #000;
            font-weight: 300;
          }

          & dd {
            display: block;
            float: left;
            position: relative;
            width: 746px;
            color: #333;
            box-sizing: border-box;
            margin: 0;

            ::after {
              display: block;
              clear: both;
              content: '';
            }

            &:hover {
              ${RemoveButton} {
                display: inline-block;
              }
            }

            .list_item_link {
              margin-right: 2px;
              display: inline-block;
              overflow: hidden;
              max-width: 719px;
              line-height: 19px;
              vertical-align: top;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
              color: #333;

              &:hover {
                text-decoration: underline;
              }
            }

            .item_info_wrapper {
              display: none;
              position: fixed;
              width: 600px;
              padding: 9px 13px 12px 16px;
            }
          }

          & dd.hover {
            ${ItemInfoWrapper} {
              display: block;
            }
          }
        }
      }
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

    .default {
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
