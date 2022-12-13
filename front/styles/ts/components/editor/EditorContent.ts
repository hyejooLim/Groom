import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  position: absolute;
  top: 70px;
  bottom: 66px;
  left: 0;
  right: 0;
  overflow-y: scroll;

  .post_header {
    padding: 0 40px;
  }

  .editor_inner:focus-visible {
    outline: none;
  }
`;

export const SelectCategory = styled.div`
  width: 860px;
  height: 30px;
  margin: 46px auto 0;
`;

export const PostTitle = styled.div`
  width: 860px;
  margin: 18px auto 17px;

  .title {
    padding: 0;
    border: 0;
    outline: none;
    background: none;
    font-size: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .title.empty::placeholder {
    color: #f75037;
  }
`;

export const TagArea = styled.div`
  width: 860px;
  min-height: 115px;
  margin: 0 auto;
  padding: 0 0 80px;
  box-sizing: border-box;
  font-size: 0;

  .tag {
    display: inline-block;
    position: relative;
    margin: 16px 10px 0 0;
    font-size: 13px;
    vertical-align: top;
    white-space: nowrap;
  }

  .close_icon {
    color: #999;
    font-size: 11px;
    margin-left: 3px;
  }

  .tag_input {
    display: inline-block;
    margin: 16px 26px 0 0;
    font-size: 13px;
    color: #909090;
    vertical-align: top;
  }
`;
