/**@format */

const { FileService } = require("../../../common/service/FileService");
const HttpHandler = require("../../../common/handler/HttpHandler");
const { PROJECT_ERROR_CODE } = require("../common/Errors");

class FilesDispatcher {
    /**
     *
     * @param {FileService} fServer
     */
    constructor(fServer) {
        /**@type {FileService} */
        this.fileServer = fServer;
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/project/document/resource", this._getFile.bind(this));
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {{code: number, text: string}[]} messageList
     * @returns
     */
    async _getFile(query, messageList) {
        return new Promise((resolve) => {
            const option = query.query["option"];
            const project = query.query["project"];
            const file = query.query["file"];
            const lang = query.lang;

            if (!!!option || !!!project || !!!file) {
                messageList.push({
                    code: PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
                    text: "no matched parameter - require option/project/file",
                });
                resolve("");
                return;
            }

            const filePack = `${option}/${project}/${lang}`;
            this.fileServer.read(file, filePack).then((result) => {
                if (!result.state) {
                    messageList.push({ code: result.code, text: result.data });
                    resolve("");
                } else {
                    resolve(encodeURI(result.data));
                }
            });
        });
    }
}

module.exports = FilesDispatcher;
