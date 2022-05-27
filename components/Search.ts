import { MultipleQueriesQuery } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";
import QueryString from "qs";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
  {}
);

export const searchClient = {
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
