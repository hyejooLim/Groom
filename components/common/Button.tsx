import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit';
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ type = 'button', children, ...rest }) => {
  return (
    <button type={type} className='disabled:bg-gray disabled:cursor-not-allowed' {...rest}>
      {children}
    </button>
  );
};

export default Button;
