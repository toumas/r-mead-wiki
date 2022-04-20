import { useEffect } from "react";
import { Hit, SearchResults } from "react-instantsearch-core";
import { List } from "../List";
import { Pagination } from "../Pagination";
import { Placeholder } from "../Placeholder";
import { Result } from "../Result";
import { PagePropsObjectByKey } from "./types";

export interface HitsListProps {
  results: SearchResults | null;
  pageData: PagePropsObjectByKey;
  setExpanded: (value: boolean) => void;
}

export function HitsList({ results, pageData, setExpanded }: HitsListProps) {
  useEffect(() => {
    setExpanded(true);
  }, [setExpanded]);

  return (
    <>
      <List>
        {results?.hits.map((hit: Hit) => {
          return (
            <div key={hit.objectID}>
              {pageData[hit.objectID] && (
                <div id="search-results">
                  <Result
                    objectID={hit.objectID}
                    matchedWords={
                      hit._highlightResult.textContent?.matchedWords
                    }
                    source={pageData[hit.objectID]?.pageProps.source}
                    highlightValue={hit._highlightResult.textContent?.value}
                  />
                </div>
              )}
              {!pageData[hit.objectID] && <Placeholder />}
            </div>
          );
        })}
      </List>
      <Pagination />
    </>
  );
}
