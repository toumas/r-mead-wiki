import { MDXRemote } from "next-mdx-remote";
import { ReactNode } from "react";
import useSWR from "swr";
import { useReadLocalStorage } from "usehooks-ts";
import { useContainerQuery } from "../hooks/useContainerQuery";
import { components } from "./map";
import { query } from "./SearchModal";

interface BackgroundPageProps {
  children: ReactNode;
}

export const localStorageKey = "lastViewedPage";

const fetcher = (...args: any) =>
  fetch([...args] as any).then((res) => res.json());

export function BackgroundPage({ children }: BackgroundPageProps) {
  const slug = useReadLocalStorage(localStorageKey);
  const [{ md }, ref, ready] = useContainerQuery(query);

  const { data, error } = useSWR(
    md && ready ? `/api/page/${slug}` : null,
    fetcher
  );

  if (error) {
    console.warn(error.message);
  }

  const { pageProps: { source } = { source: undefined } } = data ?? {};

  return (
    <div ref={ref}>
      {error && null}
      {!data && null}
      {data && <MDXRemote {...source} components={{ ...components }} />}
      {children}
    </div>
  );
}
