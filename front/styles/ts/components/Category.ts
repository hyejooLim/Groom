import styled from 'styled-components';

export const CategoryWrapper = styled.div`
  padding: 20px 0 0 30px;
  display: flex;
  flex-direction: column;
  border-top: 1px dashed black;

  & span {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0 30px 0;
    color: #1c1c1c;
  }

  & ul {
    min-height: 180px;

    & li {
      color: #3b3e3f;
      font-size: 15px;
      margin-bottom: 10px;

      .category_item:hover {
        color: #07a;
      }
    }
  }
`;
