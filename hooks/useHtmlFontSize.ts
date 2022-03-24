import { useEffect, useRef, useState } from "react";

export function useHtmlFontSize() {
  const element = useRef<HTMLElement>();
  const [fontSize, setFontSize] = useState<number>();

  useEffect(() => {
    element.current = document.querySelector("html") as HTMLHtmlElement;

    const resizeObserver = new ResizeObserver(() => {
      if (element.current) {
        const style = window
          .getComputedStyle(element.current, null)
          .getPropertyValue("font-size");
        const fontSize = parseFloat(style);
        setFontSize(fontSize);
      }
    });

    resizeObserver.observe(document.querySelector("body") as Element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return fontSize;
}
