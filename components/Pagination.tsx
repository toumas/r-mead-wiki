import tw, { styled } from "twin.macro";
import { memo, useCallback, useMemo } from "react";
import { connectPagination } from "react-instantsearch-dom";
import VisuallyHidden from "@reach/visually-hidden";
import QueryString from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerQuery } from "../hooks/useContainerQuery";
import { Stack } from "./Stack/Stack";
import { Text } from "./Text";

export const StyledPagination = styled.ul`
  ${tw`
    grid
    grid-flow-col
    auto-cols-[2rem]
    items-center
    content-center
    overflow-x-auto
    list-none
    p-0`};
`;

export const Anchor = styled.a<{
  active?: boolean;
  unallowed?: boolean;
}>`
  ${tw`flex no-underline`}
  ${({ unallowed }) => unallowed && tw`cursor-not-allowed`}
  ${({ active }) => active && tw`underline`}
`;

const query = {
  sm: {
    minWidth: 22,
  },
  md: {
    minWidth: 26,
  },
  lg: {
    minWidth: 30,
  },
  xl: {
    minWidth: 34,
  },
  "2xl": {
    minWidth: 38,
  },
  "3xl": {
    minWidth: 42,
  },
};

const paddings: { [key: string]: number } = {
  "": 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
  "2xl": 7,
  "3xl": 8,
};

export function getPaginationArr(arr: any[], p: number, i: number) {
  if (!p) {
    return arr;
  }

  const arrCopy = ([] as any[]).concat(arr);
  const remainingItems = ([] as any[]).concat(arrCopy).splice(i + 1);
  const endOverflowAmount = p - remainingItems.length;
  const endOverflow = !!!arr[i + p];
  const startOverflow = !!!arr[i - p];
  const startOverflowAmount = -(i - p);

  let startIndex = endOverflow ? i - p - endOverflowAmount : i - p;
  let endIndex = endOverflow ? undefined : i + 1 + p;

  if (startOverflow) {
    startIndex = 0;
    if (!endOverflow) {
      endIndex = (endIndex ?? 0) + startOverflowAmount;
    }
  }

  if (startIndex < 0) {
    startIndex = 0;
  }

  return arr.slice(startIndex, endIndex);
}

function getPadding(params: { [key: string]: boolean }) {
  const activeSize = Object.entries(params).reduce((acc, [key, active]) => {
    if (active) {
      return key;
    }
    return acc;
  }, "");

  return paddings[activeSize];
}

export const Pagination = memo(function Pagination({
  currentRefinement = 1,
  numberOfPages = 0,
}: {
  currentRefinement?: number;
  numberOfPages?: number;
}) {
  const [params, ref, ready] = useContainerQuery(query);
  const router = useRouter();

  const getHref = useCallback(
    (n: number) => {
      const { slug, ...queryWithoutSlug } = router.query;
      const nextSearchParams = QueryString.stringify(
        { ...queryWithoutSlug, page: n + 1 },
        { addQueryPrefix: true }
      );
      if (router.query.query) {
        const nextPath = `${(router.query.query.slice(0, -1) as string[]).join(
          "/"
        )}/${n + 1}`;
        return `${window.origin}/search/${nextPath}`;
      }
      return `${window.origin}${window.location.pathname}`;
    },
    [router.query]
  );

  const currentPage = useMemo(() => {
    if (router.query.query?.[0]) {
      const [, , page] = router.query.query as string[];
      return parseInt(page);
    }
    return 1;
  }, [router.query.query]);

  return (
    <div className="w-full" ref={ref}>
      {ready && (
        <Stack justify={tw`justify-center`}>
          <StyledPagination>
            <li>
              <Link
                href={currentPage === 1 ? "javascript:void(0)" : getHref(0)}
                passHref={true}
              >
                <Anchor unallowed={currentPage === 1}>
                  <VisuallyHidden>First</VisuallyHidden>
                  <svg
                    id="first"
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Anchor>
              </Link>
            </li>
            <li>
              <Link
                href={
                  currentPage === 1
                    ? "javascript:void(0)"
                    : getHref(currentPage - 2)
                }
                passHref={true}
              >
                <Anchor unallowed={currentPage === 1}>
                  <VisuallyHidden>Previous</VisuallyHidden>
                  <svg
                    id="previous"
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Anchor>
              </Link>
            </li>
            {getPaginationArr(
              new Array(numberOfPages).fill(null).map((_, index) => {
                return (
                  <li key={index}>
                    <Link href={getHref(index)} passHref={true}>
                      <Anchor active={currentPage === index + 1}>
                        <Text>{index + 1}</Text>
                      </Anchor>
                    </Link>
                  </li>
                );
              }),
              getPadding(params),
              currentPage - 1
            )}
            <li>
              <Link
                href={
                  currentPage >= numberOfPages
                    ? "javascript:void(0)"
                    : getHref(currentPage)
                }
                passHref={true}
              >
                <Anchor unallowed={currentPage >= numberOfPages}>
                  <VisuallyHidden>Next</VisuallyHidden>
                  <svg
                    id="next"
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Anchor>
              </Link>
            </li>
            <li>
              <Link
                href={
                  currentPage >= numberOfPages
                    ? "javascript:void(0)"
                    : getHref(numberOfPages - 1)
                }
                passHref={true}
              >
                <Anchor unallowed={currentPage >= numberOfPages}>
                  <VisuallyHidden>Last</VisuallyHidden>
                  <svg
                    id="last"
                    aria-hidden={true}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Anchor>
              </Link>
            </li>
          </StyledPagination>
        </Stack>
      )}
    </div>
  );
});

// export const Pagination = connectPagination(CustomPagination);
