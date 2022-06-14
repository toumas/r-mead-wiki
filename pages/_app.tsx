import { useHotkey } from "@react-hook/hotkey";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { localStorageKey } from "../components/BackgroundPage";
import { Container } from "../components/Container";
import { PlaceholderContextProvider } from "../components/Context";
import GlobalStyles from "../components/GlobalStyles";
import { Header } from "../components/Header";
import "../scripts/wdyr";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [, setLastViewedPage] = useLocalStorage(localStorageKey, "index");
  const previousLastViewedPage = useReadLocalStorage(localStorageKey);

  if (typeof window !== "undefined") {
    // This should be safe to do because of how Next.js handles client side
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotkey(document, ["mod", "k"], () => {
      router.push("/search");
    });
  }

  useEffect(() => {
    const path =
      router.pathname === "/"
        ? "index"
        : (router.query.slug as string[])?.join("/") ?? previousLastViewedPage;
    if (
      previousLastViewedPage !== path &&
      document.visibilityState === "visible"
    ) {
      setLastViewedPage(path);
    }
  }, [
    previousLastViewedPage,
    router.pathname,
    router.query.slug,
    setLastViewedPage,
  ]);

  return (
    <PlaceholderContextProvider>
      <GlobalStyles />
      <div ref={ref} className="p-5">
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </PlaceholderContextProvider>
  );
}

export default MyApp;
