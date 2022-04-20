import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch } from "react-instantsearch-dom";
import QueryString from "qs";
import { MultipleQueriesQuery } from "@algolia/client-search";
import Hits from "./Hits/Hits";
import SearchBox from "./SearchBox";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
  {}
);

const searchClient = {
  ...algoliaClient,
  search(requests: MultipleQueriesQuery[]) {
    const searchParams = QueryString.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const nextRequests = requests.map((r) => {
      if (searchParams.page) {
        return {
          ...r,
          params: {
            ...r.params,
            page: parseInt((searchParams.page ?? "0") as string) - 1,
          },
        };
      }
      return r;
    });

    return algoliaClient.search(nextRequests);
  },
};

export function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="wiki">
      <Configure
        hitsPerPage={5}
        highlightPreTag="<algolia-highlight>"
        highlightPostTag="</algolia-highlight>"
      />
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
