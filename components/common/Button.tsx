import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ type = 'button', className, children, ...rest }) => {
  return (
    <button
      type={type}
      className={`disabled:bg-gray disabled:shadow-none disabled:cursor-not-allowed ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
