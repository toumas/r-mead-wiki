import { ReactNode } from "react";
import tw, { styled, TwStyle } from "twin.macro";

export interface ListProps {
  children: ReactNode;
  padding?: TwStyle;
  border?: TwStyle;
  [key: string]: any;
}

type StyleProps = Exclude<ListProps, "children">;

export const StyledList = styled.div`
  & > * {
    ${({ padding }: StyleProps) => padding ?? tw`p-4`}
    ${({ border }: StyleProps) =>
      border ?? tw`border-b-2 border-brand-bright-black`}
  }
  & > *:last-child {
    border-bottom: none;
  }
`;

export function List({ children, padding, border, ...props }: ListProps) {
  return (
    <StyledList padding={padding} border={border} {...props}>
      {children}
    </StyledList>
  );
}

// ${({ padding }: { padding: any }) => padding}
