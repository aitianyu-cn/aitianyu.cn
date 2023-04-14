"use strict";
/**@format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionDispatcher = void 0;
const Error_1 = require("../common/Error");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Configures_1 = require("../config/Configures");
class SelectionDispatcher {
    constructor() {
        //
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/image/selector/select", this._selectImages.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/unselect", this._unSelectImages.bind(this));
    }
    async _selectImages(query, messageList) {
        return new Promise((resolve) => {
            const token = query.query["token"];
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("failed");
                return;
            }
            const images = Array.isArray(queryImages)
                ? queryImages
                : typeof queryImages === "string"
                    ? [queryImages]
                    : [];
            if (!images.length) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve("failed");
                return;
            }
            const resource = path_1.default.resolve(Configures_1.baseDir, token, `setting.json`);
            fs_1.default.readFile(resource, { encoding: "utf-8" }, (error, rawData) => {
                if (error) {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    for (const image of images) {
                        if (!configJson.images.includes(image)) {
                            messageList.push({
                                code: Error_1.Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });
                            continue;
                        }
                        if (!configJson.selected.includes(image)) {
                            configJson.selected.push(image);
                        }
                    }
                    try {
                        fs_1.default.writeFileSync(resource, JSON.stringify(configJson), {
                            encoding: "utf-8",
                        });
                    }
                    catch {
                        messageList.push({
                            code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                            text: "system error - handle resource failed",
                        });
                        resolve("failed");
                        return;
                    }
                    resolve("success");
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }
            });
        });
    }
    async _unSelectImages(query, messageList) {
        return new Promise((resolve) => {
            const token = query.query["token"];
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("failed");
                return;
            }
            const images = Array.isArray(queryImages)
                ? queryImages
                : typeof queryImages === "string"
                    ? [queryImages]
                    : [];
            if (!images.length) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve("failed");
                return;
            }
            const resource = path_1.default.resolve(Configures_1.baseDir, token, "setting.json");
            fs_1.default.readFile(resource, { encoding: "utf-8" }, (error, rawData) => {
                if (error) {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    const selected = configJson.selected;
                    configJson.selected = [];
                    for (const image of selected) {
                        if (!images.includes(image)) {
                            configJson.selected.push(image);
                        }
                    }
                    try {
                        fs_1.default.writeFileSync(resource, JSON.stringify(configJson), {
                            encoding: "utf-8",
                        });
                    }
                    catch {
                        messageList.push({
                            code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                            text: "system error - handle resource failed",
                        });
                        resolve("failed");
                        return;
                    }
                    resolve("success");
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve("failed");
                    return;
                }
            });
        });
    }
}
exports.SelectionDispatcher = SelectionDispatcher;
