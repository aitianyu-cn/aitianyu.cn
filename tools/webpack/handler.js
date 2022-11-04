/**@format */

const path = require("path");
const { solveEntryFile } = require("./utilities");

const webpackConfigs = require("../config/webpack/default.json");
const { TianyuShellChunks } = require("./chunkHelper");

module.exports.handleEntries = function (baseDir, entryDefs) {
    const entries = {};

    for (const entry of Object.keys(entryDefs)) {
        entries[entry] = solveEntryFile(baseDir, entryDefs[entry]);
    }

    // to add the default chunks
    for (const entry of Object.keys(TianyuShellChunks.Chunks)) {
        const chunkName = TianyuShellChunks.Chunks[entry];
        const chunkFile = TianyuShellChunks.ChunkFiles[entry];
        if (!!chunkName && !!chunkFile) {
            entries[chunkName] = path.resolve(baseDir, chunkFile);
        }
    }

    return entries;
};

module.exports.handleResolve = function (baseDir) {
    const tsConfig = require("../../tsconfig.json");
    const tsPaths = tsConfig.compilerOptions.paths;

    const alias = {};
    for (const pathAlias of Object.keys(tsPaths)) {
        const formattedAlias = pathAlias.substring(0, pathAlias.length - 2);
        const targetPath = tsPaths[pathAlias][0];
        const formattedTargetPath = targetPath.substring(0, targetPath.length - 2);
        alias[formattedAlias] = path.resolve(baseDir, formattedTargetPath);
    }

    const resolve = {
        extensions: webpackConfigs.extensions,
        alias: alias,
    };

    return resolve;
};

module.exports.handleOutput = function (baseDir) {
    const output = {
        path: path.join(baseDir, "/build"),
        filename: "[name].chunks.[contenthash:6].js",
        chunkFilename: "[name].chunks.[contenthash:8].js",
        environment: {
            arrowFunction: false,
        },
    };

    return output;
};
