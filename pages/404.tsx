import Image from 'next/image';
import styled from 'styled-components';
import logo from '../public/Groom_Logo_No_Background.png';

const Page404Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    text-align: center;
  }

  & footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 50px;
    font-size: 20px;
    text-align: center;
  }
`;

const BackButton = styled.button`
  border: 1px solid #666;
  border-radius: 20px;
  margin-top: 40px;
  width: 160px;
  height: 42px;
  transition: color 1s;
  transition: background-color 1s;

  &:hover {
    color: #fff;
    background-color: #13a085;
    border: none;
  }
`;

const Page404 = () => {
  return (
    <Page404Wrapper>
      <div>
        <h1>존재하지 않는 페이지입니다.</h1>
        <BackButton onClick={() => window.history.back()}>이전 화면</BackButton>
      </div>
      <footer>
        <Image src={logo} alt='groom_logo' width={130} height={58} />
      </footer>
    </Page404Wrapper>
  );
};

export default Page404;
