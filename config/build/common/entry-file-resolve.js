/**@format */

const path = require("path");

const PATH_HANDLER = require("./path-handler");

/**
 * 将项目入口相对地址转换为目标文件绝对地址
 *
 * @param {string} entry 入口Id的相对地址
 * @returns {string} 返回实际地址
 */
function entryFileResolve(entry) {
    return path.resolve(PATH_HANDLER.PROJECT_ROOT, `ty-${entry}`);
}

module.exports.resolve = entryFileResolve;
