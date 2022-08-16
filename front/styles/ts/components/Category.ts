import styled from 'styled-components';

export const CategoryWrapper = styled.div`
  padding: 20px 0 0 30px;
  display: flex;
  flex-direction: column;
  border-top: 1px dashed black;

  & li {
    color: #3b3e3f;
    font-size: 15px;
    margin-bottom: 10px;

    .category_item:hover {
      color: #07a;
    }
  }
`;
