import VisuallyHidden from "@reach/visually-hidden";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useCallback,
  useContext,
  useRef,
} from "react";
import tw, { styled } from "twin.macro";
import { Context } from "./Context";
import { Stack } from "./Stack/Stack";

const StyledStack = styled(Stack)`
  width: calc(100% - 1rem);
`;

export const SearchBox = forwardRef<HTMLInputElement, any>(({}, inputRef) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { setShowPlaceholder } = useContext(Context);
  const navigationTimeoutIdRef = useRef<NodeJS.Timeout>();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      if (value.length >= 2) {
        if (typeof navigationTimeoutIdRef.current === "number") {
          clearTimeout(navigationTimeoutIdRef.current);
        }
        if (value !== router.query.query?.[0]) {
          setShowPlaceholder(true);
          navigationTimeoutIdRef.current = setTimeout(() => {
            router.push(`${window.location.origin}/search/${value}/page/1`);
          }, 273);
        } else {
          setShowPlaceholder(false);
        }
      }
    },
    [router, setShowPlaceholder]
  );

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
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
          defaultValue={router.query.query?.[0]}
          onChange={handleChange}
          className="w-full bg-transparent px-1"
        />
      </StyledStack>
    </form>
  );
});

SearchBox.displayName = "SearchBox";
