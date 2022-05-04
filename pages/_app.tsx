import "../scripts/wdyr";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SearchModal } from "../components/SearchModal";
import { useHotkey } from "@react-hook/hotkey";
import { useRef } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  if (typeof window !== "undefined") {
    // This should be safe to do because of how Next.js handles client side
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotkey(document, ["mod", "k"], () => {
      router.push("/search");
    });
  }

  return (
    <>
      <GlobalStyles />
      <div ref={ref} className="p-5">
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </>
  );
}

export default MyApp;
