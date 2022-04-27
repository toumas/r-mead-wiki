import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BasicDoc, SearchResults } from "react-instantsearch-core";
import { Hits } from "../../components/Hits/Hits";
import { PagePropsObjectByKey } from "../../components/Hits/types";
import { Pagination } from "../../components/Pagination";
import { searchClient } from "../../components/Search";
import { SearchBox } from "../../components/SearchBox";
import { SearchModal } from "../../components/SearchModal";

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
  console.log(searchResults);
  
  const router = useRouter();
  const [clientSearchResults, setClientSearchResults] = useState<
    SearchResults | undefined
  >(undefined);
  // const [previewMode, setPreviewMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;
  const inputCallbackRef = useCallback((node) => {
    if (node) {
      node.focus();
      inputRef.current = node;
    }
  }, []);
  // let preview = router.isFallback || previewMode;

  useEffect(() => {
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    async function search(query: string | undefined) {
      if (typeof query === "undefined") {
        return;
      }
      const searchResults = await index.search(query, {
        hitsPerPage: 5,
        highlightPreTag: "<algolia-highlight>",
        highlightPostTag: "</algolia-highlight>",
      });
      setClientSearchResults(searchResults as unknown as SearchResults);
    }
    if (false) {
      // return <h1>Loading...</h1>;
      const query =
        router.asPath.match(/(?<=\/search\/).+/) ?? inputRef.current?.value;
      console.log(query);
      if (query?.[0]) {
        search(query[0]);
      }
    }
  }, [router]);

  const { hits, ...searchState } = searchResults ?? {};

  // let results = previewMode ? clientSearchResults : searchResults;

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [inputRef]);

  return (
    <>
      <SearchModal isOpen={true}>
        <SearchBox /* setFlag={setPreviewMode} */ ref={inputCallbackRef} />
        <Hits
          searchState={searchState}
          searchResults={searchResults}
          compiledSearchResultPages={compiledSearchResultPages}
          // previewMode={previewMode}
        />
        {/* results */searchResults?.hits[0] && (
          <Pagination
            numberOfPages={
              // previewMode
              //   ? clientSearchResults?.nbPages
              //   : searchResults?.nbPages
              searchResults?.nbPages
            }
          />
        )}
      </SearchModal>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log("staticPropsParams: ", context);

  const searchResults = await index.search(`${context.params?.query}`, {
    hitsPerPage: 5,
    highlightPreTag: "<algolia-highlight>",
    highlightPostTag: "</algolia-highlight>",
  });

  const objectIDs = searchResults.hits.map(({ objectID }) => objectID);

  // const compiledSearchResultPages: PagePropsObjectByKey = {};
  // for (const objectID of objectIDs) {
  //   const res = await fetch(`http://localhost:3000/api/page/${objectID}`);
  //   const data = await res.json();
  //   compiledSearchResultPages[objectID] = { ...data };
  // }

  return {
    revalidate: 1,
    props: { searchResults, /* compiledSearchResultPages */ },
  };
}

export async function getStaticPaths(...staticPathsParams: any[]) {
  console.log("staticPathsParams: ", staticPathsParams);

  return {
    fallback: true,
    paths: [],
  };
}
