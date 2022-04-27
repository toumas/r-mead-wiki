import "../scripts/wdyr";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalStyles from "../components/GlobalStyles";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { SearchModal } from "../components/SearchModal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      {/* <SearchModal /> */}
      <div className="p-5">
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </>
  );
}

export default MyApp;
