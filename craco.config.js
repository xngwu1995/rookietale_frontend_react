const { CracoAliasPlugin } = require("react-app-alias");

// webpack config
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/api': 'http://0.0.0.0:8000',
  //   },
  // },
  style: {
    postcss: {
      mode: "extends",
      loaderOptions: {
        postcssOptions: {
          ident: "postcss",
          plugins: [
            [
              "postcss-px-to-viewport-with-include",
              {
                unitToConvert: "px", // my unit
                viewportWidth: 1669, // width
                viewportHeight: 969, // height
                unitPrecision: 6, // precious
                propList: ["*"], // all
                viewportUnit: "vw", // vw
                fontViewportUnit: "vw", // vw
                selectorBlackList: ["ignore"],
                minPixelValue: 1, // less than 1 no transfer
                mediaQuery: true, // default false
                replace: true, // directly replace?
                exclude: [/node_modules/], // ignore file
                landscape: false,
              },
            ],
          ],
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
};
