import isEqual from "lodash.isequal";
import Mark from "mark.js";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { memo, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import md from "commonmark-helpers";
import { Source } from "./Hits";

interface Range {
  start?: number;
  length?: number;
}

export const Result = memo(
  function SearchResult({
    objectID,
    source,
    matchedWords,
    highlightValue,
  }: {
    objectID: string;
    source: Source;
    matchedWords: string[] | undefined;
    highlightValue?: string;
  }) {
    const resultElement = useRef<HTMLDivElement>(null);
    const mark = useRef<Mark>();

    useLayoutEffect(() => {
      if (resultElement.current) {
        mark.current = new Mark(resultElement.current);
      }
    }, []);

    const done = useCallback(() => {
      if (matchedWords?.[0] && highlightValue) {
        let newHighlightValue = md
          .text(
            md.matchProcess(highlightValue, (node: any) => {
              if (
                node.type === "Paragraph" &&
                node._prev?.type === "Paragraph" &&
                node._prev?._literal !== " " &&
                node._prev?._lastChild?._literal !== "]"
              ) {
                node.literal = " ";
              }
              return false;
            })
          )
          .replace(/(\n)/g, "")
          .trimStart()
          .trimEnd();

        const matchesArray = Array.from(
          newHighlightValue.matchAll(/<algolia-highlight>/g)
        );

        const ranges = matchesArray.reduce((acc: Range[]) => {
          const start = newHighlightValue.indexOf("<algolia-highlight>");
          const end = newHighlightValue.indexOf("</algolia-highlight>");
          const content = newHighlightValue.substring(start + 19, end);

          if (start > -1 && end > -1 && content.length > 0) {
            const startIndex = start;
            const [before, , innerText, , ...rest] = newHighlightValue.split(
              /(<algolia-highlight>|<\/algolia-highlight>)/
            );
            const newBefore = before;
            const newInnerText = innerText;
            const newRest = rest.join("");

            newHighlightValue = newBefore + newInnerText + newRest;
            return [...acc, { start: startIndex, length: content.length }];
          }

          return [...acc];
        }, [] as Range[]);

        // @ts-ignore
        mark.current?.markRanges(ranges, {
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
    }, [highlightValue, matchedWords]);

    useEffect(() => {
      if (mark.current) {
        mark.current.unmark({
          done,
        });
      }
    }, [done]);

    return (
      <Link href={`${objectID}`} passHref={true}>
        <a
          style={{
            display: "block",
            maxHeight: "12.5rem",
            overflowY: "hidden",
          }}
        >
          <div ref={resultElement}>
            <MDXRemote {...source} />
          </div>
        </a>
      </Link>
    );
  },
  (props, nextProps) => isEqual(props, nextProps)
);
