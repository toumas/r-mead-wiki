import produce from "immer";
import { useEffect, useReducer, useState } from "react";
import { Hit, SearchResults, SearchState } from "react-instantsearch-core";
import tw, { styled } from "twin.macro";
import { usePlaceholderContext } from "../../pages/search/Context";
import { List } from "../List";
import { Placeholder } from "../Placeholder";
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
  searchResults: SearchResults | undefined;
  compiledSearchResultPages: PagePropsObjectByKey | undefined;
  previewMode?: boolean;
}

const Wrapper = styled.div<{ expanded: boolean }>`
  ${({ expanded }) => expanded && tw`h-[57.031rem]`}
`;

export function Hits({ searchResults, previewMode = false }: HitsProps) {
  const [showPlaceholder] = usePlaceholderContext();
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
    if (!showPlaceholder && searchResults?.hits?.[0]) {
      searchResults?.hits.forEach((hit: Hit) => {
        fetchPageJson(hit.objectID);
      });
    }
  }, [searchResults?.hits, showPlaceholder]);

  return (
    <Wrapper expanded={expanded || showPlaceholder}>
      <Stack vertical={true} justify={tw`justify-between`} className="h-full">
        {showPlaceholder && (
          <List className="w-full">
            <Placeholder key="1" />
            <Placeholder key="2" />
            <Placeholder key="3" />
            <Placeholder key="4" />
            <Placeholder key="5" />
          </List>
        )}
        {searchResults?.hits.length === 0 && <p>No results found!</p>}
        {(searchResults?.hits.length as number) > 0 && (
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

// export default connectStateResults(Hits);
