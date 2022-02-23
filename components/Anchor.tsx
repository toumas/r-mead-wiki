import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export function Anchor({ href, children }: AnchorHTMLAttributes<{}>) {
  const redditBase = /(.+)?(\/r\/mead\/wiki)/;
  const index = /(index)/;

  if (typeof href === "undefined") {
    return <span>{children}</span>;
  } else {
    const slug = href.replace(redditBase, "");
    let path = redditBase.test(href) ? slug : href;

    if (index.test(path)) {
      path = path.replace(index, "");
    }

    return (
      <Link href={path}>
        <a>{children}</a>
      </Link>
    );
  }
}
