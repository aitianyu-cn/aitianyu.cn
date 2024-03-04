/**@format */

const { ArrayHelper } = require("@aitianyu.cn/types");

function _EntryAndPageProcessor(entries, pages) {
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
    const entriesOutter = [];
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

function homeProcessor() {
    const homeEntries = require("../../../ty-home/entry.json");
    const homePages = require("../../../ty-home/page");

    return _EntryAndPageProcessor(homeEntries, homePages);
}

function appProcessor() {
    const appEntries = require("../../../ty-app/entry.json");
    const appPages = require("../../../ty-app/page");

    return _EntryAndPageProcessor(appEntries, appPages);
}

function handler() {
    const entries = {};
}

module.exports.handler = handler;
