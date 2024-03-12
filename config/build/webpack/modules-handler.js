/**@format */

const webpach_modules_def = require("../common/module-defines");

/**
 * 获取modules定义信息
 *
 * @returns 返回定义
 */
module.exports.handler = function () {
    return {
        rules: webpach_modules_def.rules,
    };
};
