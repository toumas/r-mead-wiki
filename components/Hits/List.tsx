import { useEffect } from "react";
import { SearchResults } from "react-instantsearch-core";
import { List } from "../List";
import { Hit } from "./Hit";

export interface HitsListProps {
  results: SearchResults | undefined;
  setExpanded: (value: boolean) => void;
}

export function HitsList({ results, setExpanded }: HitsListProps) {
  useEffect(() => {
    setExpanded(true);
  }, [setExpanded]);

  return (
    <div className="w-full">
      <List>
        {results?.hits.map((hit) => {
          return <Hit key={hit.objectID} hit={hit} />;
        })}
      </List>
    </div>
  );
}
