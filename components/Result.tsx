import isEqual from "lodash.isequal";
import Mark from "mark.js";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { memo, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { Source } from "./Hits";

export const Result = memo(
  function SearchResult({
    objectID,
    source,
    matchedWords,
  }: {
    objectID: string;
    source: Source;
    matchedWords: string[] | undefined;
  }) {
    const resultElement = useRef<HTMLDivElement>(null);
    const mark = useRef<Mark>();

    useLayoutEffect(() => {
      if (resultElement.current) {
        mark.current = new Mark(resultElement.current);
      }
    }, []);

    const done = useCallback(() => {
      if (matchedWords?.[0]) {
        mark.current?.mark(matchedWords, {
          done: function () {
            const firstMarkElement =
              resultElement.current?.querySelector("mark");
            const xBefore = window.scrollX;
            const yBefore = window.scrollY;
            firstMarkElement?.scrollIntoView();
            window.scrollTo(xBefore, yBefore);
          },
        });
      }
    }, [matchedWords]);

    useEffect(() => {
      if (mark.current) {
        mark.current.unmark({
          done,
        });
      }
    }, [done]);

    return (
      <Link href={`${objectID}`} passHref={true}>
        <div
          ref={resultElement}
          style={{ maxHeight: "12.5rem", overflowY: "hidden" }}
        >
          <MDXRemote {...source} />
        </div>
      </Link>
    );
  },
  (props, nextProps) => isEqual(props, nextProps)
);
