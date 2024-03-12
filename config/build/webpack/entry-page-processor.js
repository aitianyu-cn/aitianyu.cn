/**@format */

const { ArrayHelper } = require("@aitianyu.cn/types");

const entries = require("../../../ty-infra/entry.json");
const pages = require("../../../ty-infra/page");

/**
 * 获取页面信息与入口信息
 *
 * @returns 返回页面与入口信息
 */
function entryAndPageProcessor() {
    const pageOutter = {};
    // const rewrites = [];

    const chunksList = [];
    for (const pageKey of Object.keys(pages)) {
        const pageInfo = pages[pageKey];
        const chunksInfo = pageInfo.chunks;

        const entryPage = {
            title: pageInfo.title,
            template: pageInfo.template,
            filename: pageInfo.filename,
            favicon: pageInfo.favicon,
            chunks: ArrayHelper.merge(chunksInfo),
        };
        pageOutter[pageKey] = entryPage;
        chunksList.push(entryPage.chunks);
    }

    const requiredChunks = ArrayHelper.merge(...chunksList);
    const errorChunks = [];
    const entriesOutter = {};
    for (const requiredChunk of requiredChunks) {
        if (entries[requiredChunk]) {
            entriesOutter[requiredChunk] = entries[requiredChunk];
        } else {
            errorChunks.push(requiredChunk);
        }
    }

    if (errorChunks.length > 0) throw Error(`could not find the chunk(s): ${errorChunks.join(", ")}`);

    return {
        chunks: entriesOutter,
        pages: pageOutter,
    };
}

module.exports.processor = entryAndPageProcessor;
