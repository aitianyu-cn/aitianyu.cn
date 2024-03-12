/**@format */

const PATH_HANDLER = require("../common/path-handler");

/**
 * 获取项目输出信息
 *
 * @returns {
 *      {
 *          path: string,
 *          filename: string,
 *          chunkFilename: string,
 *          environment: {
 *              arrowFunction: boolean
 *          }
 *     }
 * }
 */
function outputHandler() {
    const output = {
        path: PATH_HANDLER.PROJECT_OUTPUT,
        filename: "package/[name].[contenthash:8].js",
        chunkFilename: "package/[name].chunks.[contenthash:6].js",
        environment: {
            arrowFunction: false,
        },
    };

    return output;
}

module.exports.handler = outputHandler;
