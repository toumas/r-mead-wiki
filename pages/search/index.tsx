import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SearchBox } from "../../components/SearchBox";
import { SearchModal } from "../../components/SearchModal";
import SearchResultsPage from "./[...query]";

export default function Index() {
  return (
    <SearchResultsPage
      searchResults={undefined}
      compiledSearchResultPages={undefined}
      // forceSearch={true}
    />
  );
  const router = useRouter();
  console.log(router);

  const [flag, setFlag] = useState(false);

  if (flag) {
    return (
      <SearchResultsPage
        searchResults={undefined}
        compiledSearchResultPages={undefined}
        forceSearch={true}
      />
    );
  }

  return (
    <SearchModal isOpen={true}>
      <SearchBox setFlag={setFlag} />
    </SearchModal>
  );
}

export function getStaticProps() {
  return { props: {} };
}
