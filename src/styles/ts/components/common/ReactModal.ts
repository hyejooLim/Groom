import { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = HTMLAttributes<HTMLDivElement>;

export const InnerModal = styled.div<Props>`
  width: 860px;
  margin: 0 auto;
  padding: 35px 0 42px;
  box-sizing: border-box;
`;
