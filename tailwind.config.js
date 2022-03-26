const invert = require("invert-color");
const tinycolor = require("tinycolor2");

let themeRef;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: () => {
        const black = "#0e0f0f";
        const green = "#b6dfc5";
        return {
          "brand-black": black,
          "brand-light-black": `#${tinycolor(black).lighten().toHex()}`,
          "brand-bright-black": `#${tinycolor(black).brighten().brighten().toHex()}`,
          "brand-green": green,
          "brand-bright-green": `#${tinycolor(green).brighten().toHex()}`,
          "brand-yellow": "#ffc62c",
          "brand-red": "#e55429",
        };
      },
      typography: ({ theme }) => {
        if (themeRef) {
          return themeRef;
        }
        if (typeof theme === "undefined") {
          return {};
        }
        return {
          DEFAULT: {
            css: {
              maxWidth: "100%",
              "--tw-prose-body": theme("colors.brand-green"),
              "--tw-prose-headings": theme("colors.brand-green"),
              "--tw-prose-lead": theme("colors.brand-green"),
              "--tw-prose-links": theme("colors.brand-yellow"),
              "--tw-prose-bold": theme("colors.brand-green"),
              "--tw-prose-counters": theme("colors.brand-green"),
              "--tw-prose-bullets": theme("colors.brand-green"),
              "--tw-prose-hr": theme("colors.brand-green"),
              "--tw-prose-quotes": theme("colors.brand-green"),
              "--tw-prose-quote-borders": theme("colors.brand-bright-black"),
              "--tw-prose-captions": theme("colors.brand-green"),
              "--tw-prose-code": theme("colors.brand-red"),
              "--tw-prose-pre-code": theme("colors.brand-bright-green"),
              "--tw-prose-pre-bg": theme("colors.brand-light-black"),
              "--tw-prose-th-borders": theme("colors.brand-green"),
              "--tw-prose-td-borders": theme("colors.brand-green"),
              "--tw-prose-body": theme("colors.brand-green"),
              "--tw-prose-invert-headings": invert(theme("colors.brand-green")),
              "--tw-prose-invert-lead": invert(theme("colors.brand-green")),
              "--tw-prose-invert-links": invert(theme("colors.brand-yellow")),
              "--tw-prose-invert-bold": invert(theme("colors.brand-green")),
              "--tw-prose-invert-counters": invert(theme("colors.brand-green")),
              "--tw-prose-invert-bullets": invert(theme("colors.brand-green")),
              "--tw-prose-invert-hr": invert(theme("colors.brand-green")),
              "--tw-prose-invert-quotes": invert(theme("colors.brand-green")),
              "--tw-prose-invert-quote-borders": invert(
                theme("colors.brand-red")
              ),
              "--tw-prose-invert-captions": invert(theme("colors.brand-green")),
              "--tw-prose-invert-code": invert(theme("colors.brand-red")),
              "--tw-prose-invert-pre-code": invert(theme("colors.brand-green")),
              "--tw-prose-invert-pre-bg": invert(theme("colors.brand-black")),
              "--tw-prose-invert-th-borders": invert(
                theme("colors.brand-green")
              ),
              "--tw-prose-invert-td-borders": invert(
                theme("colors.brand-green")
              ),
            },
          },
        };
        return themeRef;
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
