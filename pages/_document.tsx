import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-brand-black text-brand-green">
      <Head />
      <body className="prose">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
