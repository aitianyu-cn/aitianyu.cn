/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { Errors } from "../common/Error";
import path from "path";
import fs from "fs";
import { baseDir } from "../config/Configures";
import { IImageRecorder } from "../common/Types";

export class SelectionDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/select", this._selectImages.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/unselect", this._unSelectImages.bind(this));
    }

    private async _selectImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return new Promise<string>((resolve) => {
            const token = query.query["token"];
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("failed");
                return;
            }

            const images = Array.isArray(queryImages)
                ? (queryImages as string[])
                : typeof queryImages === "string"
                ? [queryImages]
                : [];
            if (!images.length) {
                messageList.push({
                    code: Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve("failed");
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
                    for (const image of images) {
                        if (!!!configJson.images[image]) {
                            messageList.push({
                                code: Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });

                            continue;
                        }

                        if (!configJson.selected.includes(image)) {
                            configJson.selected.push(image);
                        }
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

    private async _unSelectImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return new Promise<string>((resolve) => {
            const token = query.query["token"];
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("failed");
                return;
            }

            const images = Array.isArray(queryImages)
                ? (queryImages as string[])
                : typeof queryImages === "string"
                ? [queryImages]
                : [];
            if (!images.length) {
                messageList.push({
                    code: Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve("failed");
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
                    const selected: string[] = configJson.selected;
                    configJson.selected = [];
                    for (const image of selected) {
                        if (!images.includes(image)) {
                            configJson.selected.push(image);
                        }
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
}
