/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { IImageGetList, IImageGets, IImageRecorder } from "../common/Types";
import { Errors } from "../common/Error";
import path from "path";
import fs from "fs";
import { baseDir } from "../config/Configures";

export class GetterDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/getter/selected", this._getSelected.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/list", this._getList.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/images", this._getImages.bind(this));
    }

    private async _getImages(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IImageGets[]> {
        return new Promise<IImageGets[]>((resolve) => {
            const result: IImageGets[] = [];
            const token = query.query["token"] && query.query["token"].toLowerCase();
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }

            const images = Array.isArray(queryImages) ? queryImages : typeof queryImages === "string" ? [queryImages] : [];
            if (!images.length) {
                messageList.push({
                    code: Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve(result);
                return;
            }

            const basePath = path.resolve(baseDir, token);
            const resource = path.resolve(basePath, `setting.json`);
            fs.readFile(resource, (error: NodeJS.ErrnoException | null, rawData: string | Buffer) => {
                if (error) {
                    messageList.push({ code: Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }

                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson: IImageRecorder = JSON.parse(data);
                    for (const image of images) {
                        const imageFile = path.resolve(basePath, `${image}.base64`);
                        if (!configJson.images.includes(image) || !fs.existsSync(imageFile)) {
                            messageList.push({
                                code: Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });

                            continue;
                        }

                        const data = fs.readFileSync(imageFile).toString("utf-8");
                        if (!!!data) {
                            messageList.push({
                                code: Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });

                            continue;
                        }

                        result.push({ name: image, image: data });
                    }
                    resolve(result);
                } catch {
                    messageList.push({
                        code: Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }

    private async _getList(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<IImageGetList> {
        return new Promise<IImageGetList>((resolve) => {
            const result: IImageGetList = { valid: false, all: [], selected: [] };
            const token = query.query["token"] && query.query["token"].toLowerCase();
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }

            const resource = path.resolve(baseDir, token, "setting.json");
            fs.readFile(resource, (error: NodeJS.ErrnoException | null, rawData: string | Buffer) => {
                if (error) {
                    messageList.push({ code: Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }

                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson: IImageRecorder = JSON.parse(data);
                    result.all = configJson.images;
                    result.selected = configJson.selected;
                    result.valid = true;
                    resolve(result);
                } catch {
                    messageList.push({
                        code: Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }

    private async _getSelected(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            const result: string[] = [];
            const token = query.query["token"] && query.query["token"].toLowerCase();
            if (!!!token) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }

            const resource = path.resolve(baseDir, token, "setting.json");
            fs.readFile(resource, (error: NodeJS.ErrnoException | null, rawData: string | Buffer) => {
                if (error) {
                    messageList.push({ code: Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }

                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson: IImageRecorder = JSON.parse(data);
                    result.push(...configJson.selected);
                    resolve(result);
                } catch {
                    messageList.push({
                        code: Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }
}
