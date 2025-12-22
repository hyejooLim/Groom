import Link from "next/link";
import styled from "styled-components";

const ManageWriteWrapper = styled.div`
  margin: 6px 0;
  font-size: 15px;
  border-radius: 2px;
  background: #555;
  padding: 14px 20px;

  &:hover {
    background: #777;
  }

  & span {
    color: #fff;
  }
`;

const ManageWrite = () => {
  return (
    <Link href="/write">
      <ManageWriteWrapper>
        <span>글 쓰러가기</span>
      </ManageWriteWrapper>
    </Link>
  );
};

export default ManageWrite;
