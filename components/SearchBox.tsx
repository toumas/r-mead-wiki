import VisuallyHidden from "@reach/visually-hidden";
import { isNil } from "lodash";
import { useRouter } from "next/router";
import QueryString from "qs";
import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  FormEvent,
  useCallback,
} from "react";
import { SearchBoxProvided } from "react-instantsearch-core";
import { connectSearchBox } from "react-instantsearch-dom";
import tw, { styled } from "twin.macro";
import { useDebounce } from "usehooks-ts";
import useNavigation from "../hooks/usePush";
import { Stack } from "./Stack/Stack";

const StyledStack = styled(Stack)`
  width: calc(100% - 1rem);
`;

function SearchBox({ refine }: SearchBoxProvided) {
  const router = useRouter();
  // const { push, replace } = useNavigation();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      if (value.length >= 3) {
        const searchParams = QueryString.parse(window.location.search, {
          ignoreQueryPrefix: true,
        });

        const nextSearchParams = QueryString.stringify(
          { ...searchParams, query: value, page: 1 },
          { addQueryPrefix: true }
        );

        if (searchParams.query?.length === 0) {
          setTimeout(() => {
            router.replace(`${window.location.origin}/${nextSearchParams}`);
          }, 220);
        } else if ((searchParams.query as string[])?.[0]) {
          router.push(`${window.location.origin}/${nextSearchParams}`);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    if (router.query.query) {
      refine(router.query.query);
    }
  }, [refine, router.query.query]);

  useEffect(() => {
    if (router.query.query || router.query.page) {
      refine(router.query.query);
    }
  }, [refine, router.query.page, router.query.query]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <VisuallyHidden>
        <label htmlFor="algolia_search">Search</label>
      </VisuallyHidden>
      <StyledStack mr={tw`mr-2`} className="pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
          />
        </svg>
        <input
          ref={inputRef}
          id="algolia_search"
          type="search"
          placeholder="Search for content"
          defaultValue={router.query.query}
          onChange={handleChange}
          className="w-full bg-transparent px-1"
        />
      </StyledStack>
    </form>
  );
}

export default connectSearchBox(SearchBox);
