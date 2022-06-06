const { override, fixBabelImports } = require("customize-cra");

const closeMap = (config) => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;
  return config;
};

module.exports = function override(config, env) {
  config.output = {
    ...config.output,
    filename: `static/js/bundle.js`,
    chunkFilename: `static/js/[name].chunk.js`,
  };

  closeMap(config);

  return config;
};
