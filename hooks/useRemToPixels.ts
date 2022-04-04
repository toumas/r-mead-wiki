import { useHtmlFontSize } from "./useHtmlFontSize";

export function useRemToPixels(remUnits: number) {
  const htmlFontSize = useHtmlFontSize();
  return htmlFontSize ? htmlFontSize * remUnits : undefined;
}
