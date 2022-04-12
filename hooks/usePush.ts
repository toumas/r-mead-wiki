import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import { useRef, useState } from "react";

// https://github.com/vercel/next.js/issues/18127
export default function useNavigation() {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push, replace }] = useState<Pick<NextRouter, "push" | "replace">>({
    push: (path) => routerRef.current.push(path),
    replace: (path) => routerRef.current.replace(path),
  });

  return {push, replace};
}
