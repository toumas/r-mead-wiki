import { ReactNode } from "react";
import { TwStyle } from "twin.macro";
import { HStack } from "./HStack";
import { VStack } from "./VStack";

export type CommonStackProps = {
  children: ReactNode;
  className?: string;
  items?: TwStyle;
  justify?: TwStyle;
  vertical?: boolean;
};

export type VStackProps = CommonStackProps & {
  mb?: TwStyle;
};

export type HStackProps = CommonStackProps & {
  mr?: TwStyle;
};

// When vertical is true, expect optional `mb`, else expect optional `mr` prop
export type BaseStackProps = HStackProps & VStackProps & CommonStackProps;
export type StackProps = BaseStackProps extends { vertical: true }
  ? BaseStackProps & VStackProps
  : BaseStackProps & HStackProps;

export function Stack({ children, vertical, ...props }: StackProps) {
  const Component = vertical ? VStack : HStack;
  return <Component {...props}>{children}</Component>;
}
