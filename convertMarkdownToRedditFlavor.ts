import iterator from "markdown-it-for-inline";
import lazyHeaders from "markdown-it-lazy-headers";
import MarkdownIt, { Options } from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";
import Token from "markdown-it/lib/token";
import * as entities from "entities";
import { transformCss } from "./transformCss";
import Renderer from "markdown-it/lib/renderer";

export type MutatedToken = Token & { transformAttrs?: boolean };

const configuredMd = MarkdownIt({ xhtmlOut: true })
  .use(lazyHeaders)
  .use(iterator, "lazy-link", "text", lazyLinkTransform);

const defaultTdOpenRender =
  configuredMd.renderer.rules.td_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
const defaultThOpenRender =
  configuredMd.renderer.rules.th_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

const TdOpenHandler = function (
  tokens: MutatedToken[],
  idx: number,
  options: Options,
  env: any,
  self: Renderer
) {
  if (tokens[idx].attrs?.[0]) {
    const flatAttrs = tokens[idx].attrs?.flat();
    if (flatAttrs?.includes("style")) {
      const newAttrs = tokens[idx].attrs?.reduce((acc: any, [key, value]) => {
        if (key === "style") {
          return [...acc, [key, transformCss(value)]];
        }
        return [...acc, [key, value]];
      }, []);
      tokens[idx].attrs = newAttrs;
      tokens[idx].transformAttrs = true;
    }
  }
  return defaultTdOpenRender(tokens, idx, options, env, self);
};

const ThOpenHandler = function (
  tokens: MutatedToken[],
  idx: number,
  options: Options,
  env: any,
  self: Renderer
) {
  if (tokens[idx].attrs?.[0]) {
    const flatAttrs = tokens[idx].attrs?.flat();
    if (flatAttrs?.includes("style")) {
      const newAttrs = tokens[idx].attrs?.reduce((acc: any, [key, value]) => {
        if (key === "style") {
          return [...acc, [key, transformCss(value)]];
        }
        return [...acc, [key, value]];
      }, []);
      tokens[idx].attrs = newAttrs;
      tokens[idx].transformAttrs = true;
    }
  }
  return defaultThOpenRender(tokens, idx, options, env, self);
};

configuredMd.renderer.rules.td_open = TdOpenHandler;
configuredMd.renderer.rules.th_open = ThOpenHandler;

configuredMd.renderer.renderAttrs = function renderAttrs(token: MutatedToken) {
  if (!token.attrs) {
    return "";
  }
  let result = "";
  for (let i = 0; i < token.attrs.length; i++) {
    if (token.transformAttrs) {
      result +=
        " " +
        escapeHtml(token.attrs[i][0]) +
        "={" +
        JSON.stringify(token.attrs[i][1]) +
        "}";
    } else {
      result +=
        " " +
        escapeHtml(token.attrs[i][0]) +
        '="' +
        escapeHtml(token.attrs[i][1]) +
        '"';
    }
  }
  return result;
};

function lazyLinkTransform(): any {
  return function (tokens: Token[], idx: number) {
    // this whole block is 100% code smell but whatcha gonna do about it
    if (/(?<=])\s+(?=\()/.test(tokens[idx].content) === true) {
      const href = tokens[idx].content.match(/(?<=\().+(?=\))/)?.[0] ?? "";
      const text = tokens[idx].content.match(/(?<=\[).+(?=\])/)?.[0] ?? "";

      const closingToken = new Token("text", "", 0);
      closingToken.content = text;
      tokens.push(closingToken);

      tokens[idx].type = "link_open";
      tokens[idx].tag = "a";
      tokens[idx].attrs = [["href", href]];

      const anchorClose = new Token("link_close", "/a", 0);
      anchorClose.content = "";
      tokens.push(anchorClose);
    }
  };
}

function reducer(
  acc: string,
  token: MutatedToken,
  i: number,
  arr: MutatedToken[]
): string {
  if (token.type === "softbreak") {
    return acc + " ";
  }
  if (Array.isArray(token.children)) {
    return acc + token.children.reduce(reducer, "");
  }
  if (/_close$/.test(token.type)) {
    return acc;
  } else {
    return acc + entities.decodeHTML(token.content);
  }
}

const configuredTextToContentRenderer = MarkdownIt({
  xhtmlOut: true,
})
  .use(lazyHeaders)
  .use(iterator, "lazy-link", "text", lazyLinkTransform);

configuredTextToContentRenderer.renderer.render = function (tokens) {
  return tokens.reduce(reducer, "");
};

export default function convertMarkdownToRedditFlavor(vanillaMarkdown: string) {
  return {
    convertedMarkdown: configuredMd.render(vanillaMarkdown),
    textContent: configuredTextToContentRenderer.render(vanillaMarkdown),
  };
}
