/**@format */

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const optimize = {
    splitChunks: {
        chunks: "all",
        minSize: 100000,
        maxSize: 200000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        name: false,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                filename: "common.[contenthash:6].js",
            },
            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
};

module.exports.optimize = optimize;
