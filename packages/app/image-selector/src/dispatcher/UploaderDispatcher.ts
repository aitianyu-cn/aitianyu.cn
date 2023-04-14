/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import path from "path";
import { Errors } from "../common/Error";
import { IImageRecorder, IImageRecorderItem } from "../common/Types";
import { baseDir } from "../config/Configures";
import * as fs from "fs";

interface IQueryImages extends IImageRecorderItem {
    id: string;
}

export class UploaderDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/uploader", this._uploadImages.bind(this));
    }

    private async _uploadImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return new Promise<string>((resolve) => {
            const token = query.query["token"];
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve("failed");
                return;
            }

            const images: IQueryImages[] = Array.isArray(query.query["images"])
                ? (query.query["images"] as IQueryImages[])
                : this._parseImages(query.query["images"]);
            if (0 === images.length) {
                resolve("success");
                return;
            }

            const resource = path.resolve(baseDir, `${token}.json`);
            fs.readFile(resource, { encoding: "utf-8" }, (error: NodeJS.ErrnoException | null, rawData: string | Buffer) => {
                if (error) {
                    messageList.push({
                        code: Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }

                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson: IImageRecorder = JSON.parse(data);
                    for (const imageItem of images) {
                        configJson.images[imageItem.id] = { name: imageItem.name, data: encodeURI(imageItem.data) };
                    }

                    try {
                        fs.writeFileSync(path.resolve(baseDir, `${token}.json`), JSON.stringify(configJson), {
                            encoding: "utf-8",
                        });
                    } catch {
                        messageList.push({
                            code: Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                            text: "system error - handle resource failed",
                        });
                        resolve("failed");
                        return;
                    }

                    resolve("success");
                } catch {
                    messageList.push({
                        code: Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }
            });
        });
    }

    private _parseImages(source: string): IQueryImages[] {
        try {
            return JSON.parse(source) as IQueryImages[];
        } catch {
            return [];
        }
    }
}
