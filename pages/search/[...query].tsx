import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SearchResults } from "react-instantsearch-core";
import { BackgroundPage } from "../../components/BackgroundPage";
import { Context } from "../../components/Context";
import { Hits } from "../../components/Hits/Hits";
import { Pagination } from "../../components/Pagination";
import { searchClient } from "../../components/Search";
import { SearchBox } from "../../components/SearchBox";
import { SearchModal } from "../../components/SearchModal";

const index = searchClient.initIndex("wiki");

export interface SearchResultsPageProps {
  searchResults: SearchResults | undefined;
}

export default function SearchResultsPage({
  searchResults,
}: SearchResultsPageProps) {
  const { showPlaceholder, setShowPlaceholder, timeoutId } =
    useContext(Context);
  const queryRef = useRef<string>("");
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

  useEffect(() => {
    const queryString = (router.query.query as string[])?.join(",");
    const previousValue = String(queryRef.current);
    if (queryString !== queryRef.current) {
      queryRef.current = queryString;
    }
    if (previousValue !== queryString) {
      setShowPlaceholder(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    if (router.query.query?.[0]) {
      queryRef.current = queryString;
    }
  }, [router.query, setShowPlaceholder, timeoutId]);

  return (
    <>
      <BackgroundPage>
        <SearchModal isOpen={true}>
          <SearchBox ref={inputCallbackRef} />
          <Hits searchResults={searchResults} />
          {(searchResults?.hits[0] || showPlaceholder) && (
            <Pagination numberOfPages={searchResults?.nbPages} />
          )}
        </SearchModal>
      </BackgroundPage>
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
