import "../scripts/wdyr";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import { Container } from "../components/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
