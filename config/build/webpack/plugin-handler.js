/**@format */

const path = require("path");
const webpack = require("webpack");

const configure = require("../../../environment").config;
const PATH_HANDLER = require("../common/path-handler");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MineCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const htmlFileResolve = require("../common/html-file-resolve");

function processStaticFiles() {
    const statics = configure.statics;

    const staticOutter = [];
    for (const file of Object.keys(statics)) {
        const target = path.resolve(PATH_HANDLER.PROJECT_OUTPUT, file);
        const source = path.resolve(PATH_HANDLER.PROJECT_ROOT, statics[file]);

        staticOutter.push({
            from: source,
            to: target,
        });
    }

    return staticOutter.length ? staticOutter : null;
}

module.exports.handler = function (pagesDef) {
    const plugins = [];

    // plugins.push(new NodePolyfillPlugin());

    configure.autoClean && plugins.push(new CleanWebpackPlugin());

    if (pagesDef) {
        for (const pageId of Object.keys(pagesDef)) {
            const htmlPlugin = new HtmlWebpackPlugin({
                title: pagesDef[pageId].title || pageId,
                template: htmlFileResolve.resolve(pagesDef[pageId].template || ""),
                filename: pagesDef[pageId].filename || `${pageId}.html`,
                chunks: pagesDef[pageId].chunks || [],
                favicon: (pagesDef[pageId].favicon && htmlFileResolve.resolve(pagesDef[pageId].favicon)) || false,
            });

            plugins.push(htmlPlugin);
        }
    }

    configure.mineCss && plugins.push(new MineCssExtractPlugin(configure.mineCss));

    configure.optmizeChunks && plugins.push(new webpack.optimize.SplitChunksPlugin());

    const staticFiles = processStaticFiles();
    staticFiles &&
        plugins.push(
            new CopyWebpackPlugin({
                patterns: staticFiles,
            }),
        );

    return plugins;
};
