import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef
} from "react";
import { SearchResults } from "react-instantsearch-core";
import { Hits } from "../../components/Hits/Hits";
import { PagePropsObjectByKey } from "../../components/Hits/types";
import { Pagination } from "../../components/Pagination";
import { searchClient } from "../../components/Search";
import { SearchBox } from "../../components/SearchBox";
import { SearchModal } from "../../components/SearchModal";
import { usePlaceholderContext } from "./Context";

const index = searchClient.initIndex("wiki");

export interface SearchResultsPageProps {
  searchResults: SearchResults | undefined;
  compiledSearchResultPages: PagePropsObjectByKey | undefined;
  forceSearch?: boolean;
}

export default function SearchResultsPage({
  searchResults,
  compiledSearchResultPages,
  forceSearch = false,
}: SearchResultsPageProps) {
  const [showPlaceholder, setShowPlaceholder] = usePlaceholderContext();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  const inputCallbackRef = useCallback((node) => {
    if (node) {
      node.focus();
      inputRef.current = node;
    }
  }, []);

  const { hits, ...searchState } = searchResults ?? {};

  useEffect(() => {
    if (router.query.query?.[0]) {
      setShowPlaceholder(false);
    }
  }, [router, setShowPlaceholder]);

  return (
    <>
      <SearchModal isOpen={true}>
        <SearchBox ref={inputCallbackRef} />
        <Hits
          searchState={searchState}
          searchResults={searchResults}
          compiledSearchResultPages={compiledSearchResultPages}
        />
        {(searchResults?.hits[0] || showPlaceholder) && (
          <Pagination numberOfPages={searchResults?.nbPages} />
        )}
      </SearchModal>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let searchResults: SearchResults | undefined = undefined;

  if (context.params?.query?.[0]) {
    searchResults = (await index.search(`${context.params.query[0]}`, {
      hitsPerPage: 5,
      highlightPreTag: "<algolia-highlight>",
      highlightPostTag: "</algolia-highlight>",
      page: parseInt(context.params?.query?.[2]) - 1,
    })) as unknown as SearchResults;
  }

  return {
    revalidate: 60 * 15,
    props: { searchResults },
  };
}

export async function getStaticPaths(...staticPathsParams: any[]) {
  return {
    fallback: true,
    paths: [],
  };
}
