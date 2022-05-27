import { useContext, useState } from "react";
import { SearchResults } from "react-instantsearch-core";
import tw, { styled } from "twin.macro";
import { Context } from "../Context";
import { List } from "../List";
import { Placeholder } from "../Placeholder";
import { Stack } from "../Stack/Stack";
import { HitsList } from "./List";

export enum Actions {
  addPage = "addPage",
}

export interface HitsProps {
  searchResults: SearchResults | undefined;
}

const Wrapper = styled.div<{ expanded: boolean }>`
  ${({ expanded }) => expanded && tw`h-[57.031rem]`}
`;

export function Hits({ searchResults }: HitsProps) {
  const { showPlaceholder } = useContext(Context);
  const [expanded, setExpanded] = useState<boolean>(false);

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
        {searchResults?.hits.length === 0 && (
          <p>Nothing matched what you searched for ¯\_(ツ)_/¯</p>
        )}
        {(!showPlaceholder && (searchResults?.hits.length as number)) > 0 && (
          <HitsList results={searchResults} setExpanded={setExpanded} />
        )}
      </Stack>
    </Wrapper>
  );
}
