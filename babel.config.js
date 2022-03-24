module.exports = function (api) {
  const isServer = api.caller((caller) => caller?.isServer);
  const isCallerDevelopment = api.caller((caller) => caller?.isDev);

  const presets = [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource:
            !isServer && isCallerDevelopment
              ? "@welldone-software/why-did-you-render"
              : "react",
        },
      },
    ],
  ];

  return {
    presets,
    plugins: [
      "babel-plugin-macros",
      ["babel-plugin-styled-components", { ssr: true }],
    ],
  };
};
