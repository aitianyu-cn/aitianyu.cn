/**@format */

const path = require("path");

const PATH_HANDLER = require("./path-handler");

/**
 * 将项目html相对地址转换为目标文件绝对地址
 *
 * @param {string} html 入口html的相对地址
 * @returns {string} 返回实际地址
 */
function htmlFileResolve(html) {
    return path.resolve(PATH_HANDLER.TIANYU_COMMON_ENTRY, html);
}

module.exports.resolve = htmlFileResolve;
