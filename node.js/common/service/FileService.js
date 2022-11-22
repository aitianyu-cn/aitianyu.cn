/**@format */

const fs = require("fs");
const path = require("path");

const FILE_READ_CODE = {
    SUCCESS: 0,
    NOT_ACCESSIBLE: 10,
    READ_ERROR: 15,
};

class FileService {
    /**
     *
     * @param {string} baseFolder
     */
    constructor(baseFolder) {
        /**@type {string} */
        this.baseFolder = baseFolder;
    }

    /**
     *
     * @param {string} file
     * @param {string} pack
     *
     * @return {Promise<{data: string, state: boolean, code: number}>}
     */
    async read(file, pack) {
        return new Promise((resolve) => {
            const filePath = path.resolve(this.baseFolder, pack);
            if (!fs.existsSync(filePath)) {
                resolve({
                    state: false,
                    code: FILE_READ_CODE.NOT_ACCESSIBLE,
                    data: `file is not accessible or not exists - ${filePath}`,
                });
                return;
            }

            const fileUrl = path.join(filePath, file);
            fs.readFile(fileUrl, "utf-8", (err, data) => {
                if (err) {
                    resolve({ state: false, code: FILE_READ_CODE.READ_ERROR, data: err });
                } else {
                    resolve({ state: true, code: FILE_READ_CODE.SUCCESS, data: data });
                }
            });
        });
    }
}

module.exports.FILE_READ_CODE = FILE_READ_CODE;
module.exports.FileService = FileService;
