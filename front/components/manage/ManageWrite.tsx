import Link from 'next/link';
import styled from 'styled-components';

const ManageWriteWrapper = styled.div`
  margin: 6px 0;
  font-size: 15px;
  border-radius: 2px;
  background: #444;
  padding: 14px 20px;

  &:hover {
    background: #666;
  }

  & span {
    color: #fff;
  }
`;

const ManageWrite = () => {
  return (
    <Link href='/write'>
      <a>
        <ManageWriteWrapper>
          <span>글 쓰러가기</span>
        </ManageWriteWrapper>
      </a>
    </Link>
  );
};

export default ManageWrite;
