/**@format */

const entries = require("../../../src/app/enter.json");
const pages = require("../../../src/page/page");

const { TianyuShellChunks } = require("./chunkHelper");
const { removeDuplicates } = require("./utilities");

module.exports = function () {
    const entryScripts = {};
    const entryPages = {};
    const rewrites = [];

    const chunksList = [];
    for (const entryPage of Object.keys(pages)) {
        const page = pages[entryPage];
        const chunksOfPage = [...TianyuShellChunks.Processor(page.tianyuShell), ...page.chunks];
        entryPages[entryPage] = {
            title: page.title,
            template: page.template,
            filename: page.filename,
            favicon: page.favicon,
            chunks: removeDuplicates(chunksOfPage),
        };
        for (const chunk of page.chunks) {
            if (!chunksList.includes(chunk)) chunksList.push(chunk);
        }

        const fallbacks = page.from;
        if (Array.isArray(fallbacks) && fallbacks.length > 0) {
            for (const fallback of fallbacks) {
                const regexp = fallback.regexp;
                const hash = fallback.hash;

                let targetPath = `/${page.filename}`;
                if (hash) targetPath = `${targetPath}#${hash}`;

                rewrites.push({
                    from: regexp,
                    to: targetPath,
                });
            }
        }
    }

    const errorChunks = [];
    for (const chunk of chunksList) {
        if (entries[chunk]) {
            entryScripts[chunk] = entries[chunk];
        } else {
            errorChunks.push(chunk);
        }
    }

    if (errorChunks.length > 0) throw Error(`could not find the chunk(s): ${errorChunks.join(", ")}`);

    return {
        script: entryScripts,
        pages: entryPages,
        fallback: {
            rewrites: rewrites,
        },
    };
};
