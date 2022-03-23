import { useEffect, useReducer } from "react";
import { connectStateResults, Pagination } from "react-instantsearch-dom";
import produce from "immer";
import { Hit, SearchResults, SearchState } from "react-instantsearch-core";
import { Result } from "./Result";

export interface Source {
  compiledSource: string;
}
export interface PageProps {
  source: Source;
}

export interface PagePropsObject {
  pageProps: PageProps;
}
export interface PagePropsObjectByKey {
  [key: string]: PagePropsObject;
}

export enum Actions {
  addPage = "addPage",
}

const reducerActionMap = {
  [Actions.addPage]: function (
    state: PagePropsObjectByKey,
    action: PagePropsAction
  ) {
    const nextState = produce(state, (newState) => {
      newState[action.payload.key] = action.payload.data;
    });
    return nextState;
  },
};

export interface PagePropsObjectPayload {
  key: string;
  data: PagePropsObject;
}

export interface PagePropsAction {
  type: Actions;
  payload: PagePropsObjectPayload;
}

export function reducer(state: PagePropsObjectByKey, action: PagePropsAction) {
  return { ...reducerActionMap[action.type](state, action) };
}

export function Hits({
  searchState,
  searchResults,
}: {
  searchState: SearchState;
  searchResults: SearchResults | null;
}) {
  const validQuery = (searchState.query?.length as number) >= 3; // 3 is the minimum query length
  const [pageData, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    async function fetchPageJson(objectID: string) {
      const res = await fetch(`/api/${objectID}`);
      const data = await res.json();
      dispatch({
        type: Actions.addPage,
        payload: { key: objectID, data },
      });
    }
    if (searchResults?.hits?.[0]) {
      searchResults?.hits.forEach((hit: Hit) => {
        fetchPageJson(hit.objectID);
      });
    }
  }, [searchResults?.hits]);

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>No results found!</p>
      )}
      {(searchResults?.hits.length as number) > 0 && validQuery && (
        <>
          <Pagination />
          {searchResults?.hits.map((hit: Hit, index: number) => {
            return (
              <div
                style={{ border: "1px gray solid" }}
                tabIndex={index}
                key={hit.objectID}
              >
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
              </div>
            );
          })}
          <Pagination />
        </>
      )}
    </>
  );
}

export default connectStateResults(Hits);
