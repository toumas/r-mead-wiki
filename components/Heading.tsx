import { ReactNode } from "react";
import styled from "styled-components";
import { Text } from "./Text";

export interface HeadingProps {
  children: ReactNode;
}

export function H1({ children }: HeadingProps) {
  return <StyledH1>{children}</StyledH1>;
}

export const StyledH1 = styled.h1`
  font-size: clamp(1.875rem, 2.576vw + 1rem, 2.25rem);
`;

export function H2({ children }: HeadingProps) {
  return <StyledH2>{children}</StyledH2>;
}

export const StyledH2 = styled.h2`
  font-size: clamp(1.5rem, 1.805vw + 1rem, 1.875rem);
`;

export function H3({ children }: HeadingProps) {
  return <StyledH3>{children}</StyledH3>;
}

export const StyledH3 = styled.h3`
  font-size: clamp(1.25rem, 1.2vw + 1rem, 1.5rem);
`;

export function H4({ children }: HeadingProps) {
  return <StyledH4>{children}</StyledH4>;
}

export const StyledH4 = styled.h4`
  font-size: clamp(1.125rem, 0.6vw + 1rem, 1.25rem);
`;

export function H5({ children }: HeadingProps) {
  return <Text as="h5">{children}</Text>;
}

export function H6({ children }: HeadingProps) {
  return <Text as="h6">{children}</Text>;
}
