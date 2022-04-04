import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export type AnchorProps = { focusable?: boolean } & AnchorHTMLAttributes<{}>;

export function Anchor({ href, focusable, children }: AnchorProps) {
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
        <a
          {...(focusable === false && { tabIndex: -1 })}
          className="text-brand-yellow"
        >
          {children}
        </a>
      </Link>
    );
  }
}

export function UnfocusableAnchor(props: AnchorHTMLAttributes<{}>) {
  return <Anchor focusable={false} {...props} />;
}
