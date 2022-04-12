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
  const { push, replace } = useNavigation();
  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(value, 250);
  const [dirty, setDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      refine(event.currentTarget.value);
      setValue(event.target.value);
      setDirty(true);
    },
    [refine]
  );

  const updateUrl = useCallback(() => {
    const searchParams = QueryString.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const nextSearchParams = QueryString.stringify(
      { ...searchParams, query: value, page: 1 },
      { addQueryPrefix: true }
    );

    push(`${window.location.origin}/${nextSearchParams}`);
  }, [push, value]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (inputRef.current) {
        updateUrl();
      }
    },
    [updateUrl]
  );

  useEffect(() => {
    if (value.length <= 0) {
      return;
    }

    const searchParams = QueryString.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (isNil(searchParams.page)) {
      return;
    }

    if (searchParams.query !== value) {
      updateUrl();
    }
  }, [updateUrl, value]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (debouncedValue.length > 0 || dirty) {
      const searchParams = QueryString.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      const nextSearchParams = QueryString.stringify(
        { ...searchParams, query: debouncedValue },
        { addQueryPrefix: true }
      );

      if (
        typeof searchParams.query === "string" &&
        searchParams.query.length > 0
      ) {
        push(`${window.location.origin}/${nextSearchParams}`);
      } else {
        replace(`${window.location.origin}/${nextSearchParams}`);
      }
    }
  }, [debouncedValue, dirty, push, replace]);

  useEffect(() => {
    if (router.query.query?.[0]) {
      refine(router.query.query);
    }
  }, [refine, router.query]);

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
