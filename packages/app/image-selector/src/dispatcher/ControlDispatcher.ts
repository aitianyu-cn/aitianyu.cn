/**@format */

import { HttpHandler, IHttpQuery, IHttpResponseError } from "@aitianyu.cn/server-base";
import { guid } from "@aitianyu.cn/types";
import { Errors } from "../common/Error";
import * as fs from "fs";
import * as path from "path";
import { IImageRecorder } from "../common/Types";
import { baseDir } from "../config/Configures";

export class ControlDispatcher {
    public constructor() {
        //
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/app/image/selector/createToken", this._createToken.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/releaseToken", this._releaseToken.bind(this));
    }

    private async _createToken(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return new Promise<string>((resolve) => {
            const name = query.query["name"];
            const safe = query.query["safe"];
            if (!!!name || !!!safe) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("");
                return;
            }

            const token = guid();
            const sourcePath = path.resolve(baseDir, token);
            if (!fs.existsSync(sourcePath)) {
                try {
                    fs.mkdirSync(sourcePath, { recursive: true });
                } catch {
                    messageList.push({
                        code: Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                        text: "system error - generate resource failed",
                    });
                    resolve("");
                    return;
                }
            }

            const configJson: IImageRecorder = {
                name: name,
                safe: safe,
                images: [],
                selected: [],
            };
            try {
                fs.writeFileSync(path.resolve(sourcePath, `setting.json`), JSON.stringify(configJson), {
                    encoding: "utf-8",
                });
            } catch {
                messageList.push({
                    code: Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                    text: "system error - generate resource failed",
                });
                resolve("");
                return;
            }

            resolve(token);
        });
    }

    private async _releaseToken(query: IHttpQuery, messageList: IHttpResponseError[]): Promise<string> {
        return new Promise<string>((resolve) => {
            const token = query.query["token"];
            const safe = query.query["safe"];
            if (!!!token || !!!safe) {
                messageList.push({
                    code: Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token and safe item in query",
                });
                resolve("failed");
                return;
            }

            const basePath = path.resolve(baseDir, token);
            const resource = path.resolve(basePath, `setting.json`);
            fs.readFile(resource, (error: NodeJS.ErrnoException | null, rawData: string | Buffer) => {
                if (error) {
                    resolve("invalid-token");
                    return;
                }

                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson: IImageRecorder = JSON.parse(data);
                    if (configJson.safe !== safe) {
                        resolve("invalid-safe");
                        return;
                    }

                    fs.rm(basePath, { recursive: true }, (error: NodeJS.ErrnoException | null) => {
                        resolve(error ? "failed" : "success");
                    });
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
