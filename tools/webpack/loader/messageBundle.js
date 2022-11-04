/**@format */

const path = require("path");
const fs = require("fs");
const readline = require("readline");

function messageBundleLoader(source) {
    const textMap = {};
    const callback = this.async();

    const resBaseName = path.basename(this.resourcePath, ".msgbundle");
    const resDirName = path.dirname(this.resourcePath);

    const readInterface = readline.createInterface({
        input: fs.createReadStream(`${resDirName}/${resBaseName}.msgbundle`),
        console: false,
    });

    readInterface.on("line", (line) => {
        if (line.length > 0 && line[0] !== "#" && line[0] !== " ") {
            const splitIndex = line.indexOf("=");
            const key = line.substring(0, splitIndex).trimEnd();
            const text = line.substring(line.indexOf("=") + 1).trimStart();
            textMap[key] = text;
        }
    });

    readInterface.on("close", (input) => {
        const output = `module.exports = ${JSON.stringify(textMap)}`;
        callback(null, output);
        readInterface.close();
    });
}

module.exports = messageBundleLoader;
