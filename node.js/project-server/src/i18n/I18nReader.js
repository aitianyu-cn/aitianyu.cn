/**@format */

const path = require("path");

class I18nReader {
    constructor() {
        this.readers = {};
    }

    get(language, pack) {
        const file = path.resolve(__dirname, "../../resources", pack, `${language}.json`);

        if (this.readers[file]) {
            return this.readers[file];
        }

        const reader = require(file);
        this.readers[file] = reader;

        return reader;
    }
}

module.exports = I18nReader;
