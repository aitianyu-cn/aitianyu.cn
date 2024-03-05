/**@format */

const { resolve } = require("../common/entry-file-resolve");

/**
 * 处理原始的入口信息，将所有入口的相对地址转换为绝对地址
 *
 * @param {{[id: string]: string}} entries 原始的入口信息
 * @returns {{[id: string]: string}} 返回包含绝对地址的入口信息
 */
function handler(entries) {
    const entriesOutter = {};

    for (const entry of Object.keys(entries)) {
        entriesOutter[entry] = resolve(entries[entry]);
    }

    return entriesOutter;
}

module.exports.handler = handler;
