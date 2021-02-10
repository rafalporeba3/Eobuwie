module.exports = {
  lintOnSave: false,
  publicPath: process.env.PUBLIC_PATH,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/abstract.scss';
        `,
      },
    },
  },
};
