/**@format */

const path = require("path");

const PATH_HANDLER = require("../common/path-handler");
const { EXTENSIONS } = require("../common/extension");

module.exports.handler = function () {
    const tsConfig = require("../../../tsconfig.json");
    const tsPaths = tsConfig.compilerOptions.paths;

    const alias = {};
    for (const pathAlias of Object.keys(tsPaths)) {
        const formattedAlias = pathAlias.substring(0, pathAlias.length - 2);
        const targetPath = tsPaths[pathAlias][0];
        const formattedTargetPath = targetPath.substring(0, targetPath.length - 2);
        alias[formattedAlias] = path.resolve(PATH_HANDLER.PROJECT_ROOT, formattedTargetPath);
    }

    // const fallback = {
    //     crypto: false,
    //     ...(webpackConfigs.resolve?.fallback || {}),
    // };

    const resolve = {
        extensions: EXTENSIONS,
        alias: alias,
        // fallback: fallback,
    };

    return resolve;
};
