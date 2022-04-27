import Link from "next/link";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { Stack } from "./Stack/Stack";
import { Text } from "./Text";

export function SearchButton() {
  const {asPath} = useRouter();

  return (
    <Link href={`/search`}>
      <a className="flex items-center">
        <Stack mr={tw`mr-2`}>
          <Text as="span">Search</Text>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </Stack>
      </a>
    </Link>
  );
}
