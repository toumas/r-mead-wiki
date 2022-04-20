export interface PagePropsObject {
  pageProps: PageProps;
}

export interface PageProps {
  source: Source;
}

export interface Source {
  compiledSource: string;
}

export interface PagePropsObjectByKey {
  [key: string]: PagePropsObject;
}
