import { ReactNode } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface StackProps {
  children: ReactNode;
  vertical?: boolean;
}

export function Stack({ children, vertical }: StackProps) {
  return (
    <StyledDiv
      className="grid grid-flow-col items-center gap-2"
      vertical={vertical}
    >
      {children}
    </StyledDiv>
  );
}

interface StyleProps {
  vertical?: boolean;
}

export const StyledDiv = styled.div(({ vertical }: StyleProps) => [
  vertical && tw`grid-flow-row`,
]);
