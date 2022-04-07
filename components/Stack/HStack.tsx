import tw, { styled } from "twin.macro";
import { HStackProps } from "./Stack";

export function HStack({ children, vertical, mr, ...props }: HStackProps) {
  return (
    <HorizontalStack mr={mr} {...props}>
      {children}
    </HorizontalStack>
  );
}

export type HStackStyleProps = Exclude<HStackProps, "children | className">;

export const HorizontalStack = styled.div`
  ${tw`flex self-stretch items-center`}
  ${({ items }: HStackStyleProps) => items}
  ${({ justify }: HStackStyleProps) => justify}
  & > * {
    ${({ mr }: HStackStyleProps) => mr ?? tw`mr-4`}
  }
  & > *:last-child {
    ${tw`mr-0`}
  }
`;
