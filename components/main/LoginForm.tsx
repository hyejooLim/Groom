import React from "react";
import Link from "next/link";

import {
  LoginFormWrapper,
  LoginButton,
} from "../../styles/ts/components/main/LoginForm";

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <p className="info">지금 바로 Groom을 이용해 보세요.</p>
      <Link href="/login">
        <LoginButton>
          <span className="text">Groom</span>
          로그인
        </LoginButton>
      </Link>
    </LoginFormWrapper>
  );
};

export default LoginForm;
