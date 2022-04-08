import tw, { styled } from "twin.macro";
import { memo, MouseEvent } from "react";
import { connectPagination } from "react-instantsearch-dom";
import { useContainerQuery } from "../hooks/useContainerQuery";
import { Stack } from "./Stack/Stack";
import { Text } from "./Text";
import VisuallyHidden from "@reach/visually-hidden";

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

export const PaginationButton = styled.button`
  ${tw`flex`}
  &[disabled] {
    ${tw`cursor-not-allowed`}
  }
  ${({ active }: { active?: boolean }) => active && tw`underline`}
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

export const CustomPagination = memo(function Pagination({
  currentRefinement,
  nbPages,
  refine,
}: {
  currentRefinement: number;
  nbPages: number;
  refine: (n: number) => void;
}) {
  const [params, ref, ready] = useContainerQuery(query);

  const handleOnClick = (n: number) => (event: MouseEvent) => {
    event.preventDefault();
    refine(n);
  };

  return (
    <div ref={ref}>
      {ready && (
        <Stack justify={tw`justify-center`}>
          <StyledPagination>
            <li>
              <PaginationButton
                disabled={currentRefinement === 1}
                onClick={handleOnClick(1)}
              >
                <VisuallyHidden>First</VisuallyHidden>
                <svg
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
              </PaginationButton>
            </li>
            <li>
              <PaginationButton
                disabled={currentRefinement === 1}
                onClick={handleOnClick(currentRefinement - 1)}
              >
                <VisuallyHidden>Previous</VisuallyHidden>
                <svg
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
              </PaginationButton>
            </li>
            {getPaginationArr(
              new Array(nbPages).fill(null).map((_, index) => {
                return (
                  <li key={index}>
                    <PaginationButton
                      active={currentRefinement === index + 1}
                      onClick={handleOnClick(index + 1)}
                    >
                      <Text>{index + 1}</Text>
                    </PaginationButton>
                  </li>
                );
              }),
              getPadding(params),
              currentRefinement
            )}
            <li>
              <PaginationButton
                onClick={handleOnClick(currentRefinement + 1)}
                disabled={currentRefinement >= nbPages}
              >
                <VisuallyHidden>Next</VisuallyHidden>
                <svg
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
              </PaginationButton>
            </li>
            <li>
              <PaginationButton
                onClick={handleOnClick(nbPages)}
                disabled={currentRefinement >= nbPages}
              >
                <VisuallyHidden>Last</VisuallyHidden>
                <svg
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
              </PaginationButton>
            </li>
          </StyledPagination>
        </Stack>
      )}
    </div>
  );
});

export const Pagination = connectPagination(CustomPagination);
