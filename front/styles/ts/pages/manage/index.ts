import styled from 'styled-components';

export const CountVisitorWrapper = styled.div`
  position: relative;
  padding: 25px 30px;
  margin-top: 20px;
  height: 105px;
  border-radius: 1px;
  border: 1px solid #e0e5ee;
  background: #fff;
  box-sizing: border-box;
`;

export const CountVisitor = styled.div`
  float: left;
  padding: 0 24px 0 0;
  margin-top: -1px;

  & .title {
    font-size: 15px;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
    color: #555;
  }

  & .number {
    padding: 5px 0 0;
    font-weight: bold;
    font-size: 20px;
    font-family: 'Avenir Next Regular', AppleSDGothicNeo, '돋움', dotum, sans-serif;
    color: #000;
  }
`;

export const LastPosts = styled.div`
  margin-top: 54px;

  & ul {
    overflow: hidden;
    width: 900px;
    margin-top: 3px;

    & li {
      float: left;
      position: relative;
      width: 217px;
      height: 246px;
      margin: 6px 7px 0 0;
      border: 1px solid #e0e5ee;
      background: #fff;

      & a {
        color: #333;
        display: block;
        margin: 26px 24px 0;

        &:hover :first-child {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const PostTitle = styled.p`
  max-height: 60px;
  line-height: 20px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: normal;
  font-family: 'Noto Sans Regular', AppleSDGothicNeo, '돋움', dotum, sans-serif;
`;

export const PostContent = styled.p`
  max-height: 90px;
  line-height: 18px;
  font-size: 13px;
  color: #808080;
  margin: 0;
`;

export const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 41px;
  padding: 0 24px 19px 23px;
  color: #777;
  letter-spacing: -0.2px;
  box-sizing: border-box;

  & span {
    display: block;
    overflow: hidden;
    float: left;
    position: relative;
    margin: 4px 12px 0 0;
    font-size: 13px;
    font-family: 'Avenir Next Regular', 'Noto Sans DemiLight', AppleSDGothicNeo, '돋움', dotum, sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :last-child::after {
    content: '';
    display: block;
    position: absolute;
    top: 11px;
    left: 61.4px;
    width: 2px;
    height: 2px;
    background-color: #c5c5c5;
  }
`;

export const EmptyBox = styled.div`
  float: left;
  position: relative;
  width: 217px;
  height: 246px;
  margin: 6px 7px 0 0;
  border: 1px solid #e0e5ee;
  color: #777;
  background: #fff;
  line-height: 246px;
  text-align: center;
  font-size: 18px;
  font-style: italic;
  font-family: sans-serif;
`;
