/**@format */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MineCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const { solveHtmlFile } = require("./utilities");
const extPlugins = require("../../../webpack/plugins");

const chunksPrority = ["vendors", "common", "tianyushell_core", "tianyushell_component"];

const fnGetChunkPrority = (entry) => {
    for (let i = 0; i < chunksPrority.length; ++i) {
        if (entry.startsWith(chunksPrority[i])) {
            return chunksPrority.length - i;
        }
    }

    return 0;
};

const fnChunksSortMode = (entryNameA, entryNameB) => {
    const entryAPrority = fnGetChunkPrority(entryNameA);
    const entryBPrority = fnGetChunkPrority(entryNameB);

    return entryBPrority - entryAPrority;
};

module.exports.pluginsGenerator = function (baseDir, pagesDef) {
    const plugins = [];

    // plugins.push(new NodePolyfillPlugin());

    extPlugins.config.autoClean && plugins.push(new CleanWebpackPlugin());

    if (pagesDef) {
        const htmls = Object.keys(pagesDef);
        for (const html of htmls) {
            const htmlPlugin = new HtmlWebpackPlugin({
                title: pagesDef[html].title || html,
                template: solveHtmlFile(baseDir, pagesDef[html].template || ""),
                filename: pagesDef[html].filename || `${html}.html`,
                chunks: pagesDef[html].chunks || [],
                favicon: (pagesDef[html].favicon && `${baseDir}/${pagesDef[html].favicon}`) || false,
                chunksSortMode: fnChunksSortMode,
            });

            plugins.push(htmlPlugin);
        }
    }

    const mineCss = extPlugins.config.mineCss;
    mineCss && plugins.push(new MineCssExtractPlugin(mineCss));

    extPlugins.config.optmizeChunks && plugins.push(new webpack.optimize.SplitChunksPlugin());

    plugins.push(...extPlugins.plugins);

    return plugins;
};