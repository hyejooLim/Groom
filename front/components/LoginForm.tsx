import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

const LoginFormWrapper = styled.div`
  height: 220px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const LoginButton = styled(Button)`
  background-color: #13a085;
  padding: 14px 70px;
  color: white;
  border-radius: 8px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <p style={{ marginBottom: 30, fontSize: '15px' }}>지금 바로 Groom을 이용해 보세요.</p>
      <Link href='/login'>
        <a>
          <LoginButton>
            <span style={{ fontSize: '20px', fontWeight: 800, marginRight: 20 }}>Groom</span>로그인
          </LoginButton>
        </a>
      </Link>
    </LoginFormWrapper>
  );
};

export default LoginForm;
