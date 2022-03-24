import { useMemo } from "react";
import { useContainerQuery as useCQ } from "react-container-query";
import { Query, Size } from "react-container-query/lib/interfaces";
import { useHtmlFontSize } from "./useHtmlFontSize";

export function queryWithPixels(queryWithRems: Query, htmlFontSize: number) {
  const newQuery = Object.entries(queryWithRems).reduce(
    (acc, [key, { minWidth, maxWidth, minHeight, maxHeight }]) => {
      return {
        ...acc,
        [key]: {
          ...(minWidth && { minWidth: Math.floor( minWidth * htmlFontSize)  }),
          ...(maxWidth && { maxWidth: Math.floor( maxWidth * htmlFontSize - 1) }),
        },
      };
    },
    {}
  );
  return newQuery;
}

export function useContainerQuery(query: Query, initialSize: Size = {}) {
  const htmlFontSize = useHtmlFontSize();
  const newQuery = useMemo(
    () => (htmlFontSize ? queryWithPixels(query, htmlFontSize) : {}),
    [htmlFontSize, query]
  );
  console.log(newQuery);
  
  const [params, containerRef] = useCQ(newQuery, initialSize);
  return [params, containerRef];
}
