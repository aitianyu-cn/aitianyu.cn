/**@format */

import { FileService, HttpHandler, IHttpResponseError } from "@aitianyu.cn/server-base";
import { PROJECT_ERROR_CODE } from "../common/Errors";
import { IHttpQuery } from "@aitianyu.cn/server-base";

export class FilesDispatcher {
    private fileServer: FileService;

    public constructor(fServer: FileService) {
        this.fileServer = fServer;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/project/document/resource", this._getFile.bind(this));
    }

    private async _getFile(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
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
