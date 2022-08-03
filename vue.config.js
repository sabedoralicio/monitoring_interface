const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,   // false means eslint being off … uff …
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
