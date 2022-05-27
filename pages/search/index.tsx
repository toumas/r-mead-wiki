import SearchResultsPage from "./[...query]";

export default function Index() {
  return <SearchResultsPage searchResults={undefined} />;
}

export function getStaticProps() {
  return { props: {} };
}
