import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";
import { useRouter } from "next/router";
import { ReactNode, useCallback } from "react";
import tw, { styled } from "twin.macro";
import { useContainerQuery } from "../hooks/useContainerQuery";
import { Search } from "./Search";

const query = {
  md: { minWidth: 48.5 },
};

export const StyledDialogContent = styled(DialogContent)`
  ${tw`bg-brand-light-black w-full p-4 flex flex-col min-h-screen m-0 relative overflow-y-scroll`}
  ${({ md }: { md: boolean }) =>
    md &&
    tw`m-auto max-w-[58.5rem] min-h-0 h-auto max-h-screen overflow-y-auto`}
`;

export const StyledDialogOverlay = styled(DialogOverlay)`
  ${tw`flex`}
`;

export interface SearchModalProps {
  children: ReactNode;
  isOpen: boolean;
}

export function SearchModal({ children, isOpen }: SearchModalProps) {
  const { asPath, push } = useRouter();
  const [{ md }, ref, ready] = useContainerQuery(query);

  const handleClose = useCallback(() => {
    const { origin, pathname } = window.location;
    push(`${origin}/${pathname}`);
  }, [push]);

  return (
    <StyledDialogOverlay isOpen={isOpen} onDismiss={handleClose}>
      <StyledDialogContent md={md} ref={ref} aria-label="Search">
        {ready && (
          <>
            <button
              className="close-button absolute right-0 top-0 -translate-x-2 translate-y-2 self-start"
              onClick={handleClose}
            >
              <VisuallyHidden>Close</VisuallyHidden>
              <svg
                aria-hidden={true}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {children}
          </>
        )}
      </StyledDialogContent>
    </StyledDialogOverlay>
  );
}
