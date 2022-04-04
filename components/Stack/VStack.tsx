import tw, { styled } from "twin.macro";
import { StackProps, VStackProps } from "./Stack";

export function VStack({ children, mb, ...props }: VStackProps) {
  return (
    <VerticalStack mb={mb} {...props}>
      {children}
    </VerticalStack>
  );
}

export type VStackStyleProps = Exclude<StackProps, "children | className">;

export const VerticalStack = styled.div`
  ${tw`flex flex-col self-stretch items-center`}
  & > * {
    ${({ mb }: VStackStyleProps) => mb ?? tw`mb-4`}
  }
  & > *:last-child {
    ${tw`mb-4`}
  }
`;
