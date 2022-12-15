"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesDispatcher = void 0;
const Errors_1 = require("../common/Errors");
class FilesDispatcher {
    constructor(fServer) {
        this.fileServer = fServer;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/project/document/resource", this._getFile.bind(this));
    }
    async _getFile(query, messageList) {
        return new Promise((resolve) => {
            const option = query.query["option"];
            const project = query.query["project"];
            const file = query.query["file"];
            const lang = query.lang;
            if (!!!option || !!!project || !!!file) {
                messageList.push({
                    code: Errors_1.PROJECT_ERROR_CODE.NO_MATCHED_PARAMS,
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
                }
                else {
                    resolve(encodeURI(result.data));
                }
            });
        });
    }
}
exports.FilesDispatcher = FilesDispatcher;
