import isEqual from "lodash.isequal";
import Mark from "mark.js";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { memo, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import md from "commonmark-helpers";
import { Source } from "./Hits";
import { components } from "./map";
import { UnfocusableAnchor } from "./Anchor";

interface Range {
  start?: number;
  length?: number;
}

function getOverflowingParentElement(
  element: HTMLElement
): undefined | HTMLElement {
  if (element.scrollHeight > element.clientHeight) {
    return element;
  } else if (element.parentElement) {
    return getOverflowingParentElement(element.parentElement);
  } else {
    return undefined;
  }
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
          className: "bg-brand-bright-black text-brand-bright-green",
          done: function () {
            const firstMarkElement =
              resultElement.current?.querySelector("mark");

            if (firstMarkElement) {
              if (firstMarkElement.parentElement) {
                const overflowingParent = getOverflowingParentElement(
                  firstMarkElement.parentElement
                );
                if (overflowingParent) {
                  overflowingParent.scrollTop =
                    firstMarkElement.offsetTop - overflowingParent.offsetTop;
                }
              }
            }
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
        <a className="grid grid-cols-[min-content_1fr] items-center gap-1 text-brand-green no-underline">
          <svg
            aria-hidden={true}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-brand-yellow"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-brand-yellow">/{objectID}</span>
          <div
            ref={resultElement}
            tabIndex={-1}
            className="col-start-2 max-h-20 overflow-hidden"
          >
            <MDXRemote
              {...source}
              components={{ ...components, a: UnfocusableAnchor }}
            />
          </div>
        </a>
      </Link>
    );
  },
  (props, nextProps) => isEqual(props, nextProps)
);
