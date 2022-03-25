import { ReactNode } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useContainerQuery } from "../hooks/useContainerQuery";

const query = {
  md: {
    minWidth: 48.5,
  },
};

export interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  const [{ md }, containerRef, ready] = useContainerQuery(query);

  return (
    <StyledContainer ref={containerRef} className="p-5" md={md}>
      {ready && children}
    </StyledContainer>
  );
}

export const StyledContainer = styled.div(({ md }: { md: boolean }) => [
  md && tw`m-auto max-w-[48.5rem]`,
]);
