import produce from "immer";
import { useEffect, useReducer, useState } from "react";
import { Hit, SearchResults, SearchState } from "react-instantsearch-core";
import { connectStateResults } from "react-instantsearch-dom";
import tw, { styled } from "twin.macro";
import { Stack } from "../Stack/Stack";
import { HitsList } from "./List";
import { PagePropsObject, PagePropsObjectByKey } from "./types";

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

export interface HitsProps {
  searchState: SearchState;
  searchResults: SearchResults | null;
}

const Wrapper = styled.div<{ expanded: boolean }>`
  ${({ expanded }) => expanded && tw`h-[57.031rem]`}
`;

export function Hits({ searchState, searchResults }: HitsProps) {
  const validQuery = (searchState.query?.length as number) >= 3;
  const [pageData, dispatch] = useReducer(reducer, {});
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPageJson(objectID: string) {
      const res = await fetch(`/api/page/${objectID}`);
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
    <Wrapper expanded={expanded}>
      <Stack vertical={true} justify={tw`justify-between`} className="h-full">
        {searchResults?.hits.length === 0 && validQuery && (
          <p>No results found!</p>
        )}
        {(searchResults?.hits.length as number) > 0 && validQuery && (
          <HitsList
            results={searchResults}
            pageData={pageData}
            setExpanded={setExpanded}
          />
        )}
      </Stack>
    </Wrapper>
  );
}

export default connectStateResults(Hits);
