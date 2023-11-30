/**@format */

const path = require("path");

const { checkNumeric } = require("./webpack/utilities");
const { handleResolve } = require("./webpack/handler");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const { pluginsGenerator } = require("./webpack/pluginHelper");
// const webpackEnvSetting = require("./config/webpack");
const modules = require("./webpack/modules");
const devServer = require("./webpack/devServer");

const baseDir = path.resolve(process.cwd(), ".");

module.exports = {
    entry: {
        index: path.resolve(baseDir, "tianyu/ui/index.ts"),
    },
    output: {
        path: path.join(__dirname, "/webpack-build"),
        filename: "package/[name].[contenthash:8].js",
        chunkFilename: "package/[name].chunks.[contenthash:6].js",
        environment: {
            arrowFunction: false,
        },
    },
    module: {
        rules: modules.rules,
    },
    // plugins: pluginsGenerator(),
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "aitianyu.cn",
            template: path.resolve(baseDir, "tianyu/ui/index.html"),
            filename: "index.html",
            chunks: ["index"],
            favicon: path.resolve(baseDir, "tianyu/ui/index_favicon.ico"),
        }),
    ],
    resolve: handleResolve(baseDir),
    mode: "development",
    devtool: "source-map",
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        // ignored: /node_modules/,
    },
    devServer: devServer.generator(),
};
