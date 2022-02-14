import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch } from "react-instantsearch-dom";
import Hits from "./Hits";
import SearchBox from "./SearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

export function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName="wiki">
      <Configure hitsPerPage={5} />
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
