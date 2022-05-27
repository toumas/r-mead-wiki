import { useHotkey } from "@react-hook/hotkey";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Container } from "../components/Container";
import { PlaceholderContextProvider } from "../components/Context";
import GlobalStyles from "../components/GlobalStyles";
import { Header } from "../components/Header";
import "../scripts/wdyr";
import "../styles/globals.css";

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
