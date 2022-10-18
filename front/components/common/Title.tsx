import React, { FC } from 'react';
import { StyledTitle } from '../../styles/ts/components/common/Title';

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
