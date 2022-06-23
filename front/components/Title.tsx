import React, { FC } from 'react';
import styled from 'styled-components';

interface TitleProps {
  title: string;
}

const StyledTitle = styled.h2`
  display: inline-block;
  margin: 0 0 40px;
  padding: 0 5px 3px;
  font-size: 20px;
  font-weight: 400;
  color: #444;
  line-height: 200%;
  border-bottom: 1px dashed #ddd;
  text-shadow: 1px 1px #dedede;
  word-break: break-word;
`;

const Title: FC<TitleProps> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
