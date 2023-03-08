const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
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
