import styled from "styled-components";
import tw from "twin.macro";
import Link from "next/link";
import { useContainerQuery } from "../hooks/useContainerQuery";
import { SearchButton } from "./SearchButton";
import { StyledH1 as BaseH1 } from "./Heading";

const query = {
  md: {
    minWidth: 48.5,
  },
};

export function Header() {
  const [sizes, ref, ready] = useContainerQuery(query);

  return (
    <>
      <StyledHeader ref={ref} {...sizes}>
        {ready && (
          <>
            <Link href="/" passHref={true}>
              <a className="no-underline">
                <HomeLink>r/mead wiki</HomeLink>
              </a>
            </Link>
            <SearchButton />
          </>
        )}
      </StyledHeader>
    </>
  );
}

interface StyleProps {
  md: boolean;
}

export const StyledHeader = styled.header(({ md }: StyleProps) => [
  tw`flex flex-row justify-between items-end h-12`,
  md && tw`m-auto max-w-[48.5rem]`,
]);

export const HomeLink = styled(BaseH1)(() => [tw`m-0`]);
