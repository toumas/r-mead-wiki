import { Hit as IHit } from "react-instantsearch-core";
import useSWR from "swr";
import { Placeholder } from "../Placeholder";
import { Result } from "../Result";

const fetcher = (...args: any) =>
  fetch([...args] as any).then((res) => res.json());

export function Hit({ hit }: { hit: IHit }) {
  const { objectID } = hit;
  const { data, error } = useSWR(`/api/page/${objectID}`, fetcher);

  if (error) {
    return (
      <Result
        objectID={hit.objectID}
        matchedWords={hit._highlightResult.textContent?.matchedWords}
        source={null}
        highlightValue={hit._highlightResult.textContent?.value}
      />
    );
  }

  if (!data) {
    return <Placeholder />;
  }

  return (
    <div id="search-results">
      <Result
        objectID={hit.objectID}
        matchedWords={hit._highlightResult.textContent?.matchedWords}
        source={data?.pageProps.source}
        highlightValue={hit._highlightResult.textContent?.value}
      />
    </div>
  );
}
