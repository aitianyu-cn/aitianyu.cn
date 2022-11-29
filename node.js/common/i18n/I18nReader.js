/**@format */

const path = require("path");

class I18nReader {
    /**
     *
     * @param {string} basicPath
     */
    constructor(basicPath) {
        /**
         * @type {{[filePath: string]: {[key: string]: string}}}
         */
        this.readers = {};
        /**@type {string} */
        this.base = basicPath || __dirname;
    }

    /**
     *
     * @param {string} language
     * @param {string} pack
     * @returns {{[key: string]: string}}
     */
    get(language, pack) {
        // const file = path.resolve(__dirname, "../../resources", pack, `${language}.json`);
        const file = path.resolve(this.base, pack, `${language}.json`);

        if (this.readers[file]) {
            return this.readers[file];
        }

        let reader = {};
        try {
            reader = require(file);
            this.readers[file] = reader;
        } catch {}

        return reader;
    }
}

module.exports = I18nReader;
