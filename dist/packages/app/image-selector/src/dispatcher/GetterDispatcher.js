"use strict";
/**@format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetterDispatcher = void 0;
const Error_1 = require("../common/Error");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Configures_1 = require("../config/Configures");
class GetterDispatcher {
    constructor() {
        //
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/image/selector/getter/selected", this._getSelected.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/list", this._getList.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/getter/images", this._getImages.bind(this));
    }
    async _getImages(query, messageList) {
        return new Promise((resolve) => {
            const result = [];
            const token = query.query["token"] && query.query["token"].toLowerCase();
            const queryImages = query.query["images"];
            if (!!!token) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }
            const images = Array.isArray(queryImages) ? queryImages : typeof queryImages === "string" ? [queryImages] : [];
            if (!images.length) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_PARAM_LOST,
                    text: "no matched parameter - require images",
                });
                resolve(result);
                return;
            }
            const basePath = path_1.default.resolve(Configures_1.baseDir, token);
            const resource = path_1.default.resolve(basePath, `setting.json`);
            fs_1.default.readFile(resource, (error, rawData) => {
                if (error) {
                    messageList.push({ code: Error_1.Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    for (const image of images) {
                        const imageFile = path_1.default.resolve(basePath, `${image}.base64`);
                        if (!configJson.images.includes(image) || !fs_1.default.existsSync(imageFile)) {
                            messageList.push({
                                code: Error_1.Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });
                            continue;
                        }
                        const data = fs_1.default.readFileSync(imageFile).toString("utf-8");
                        if (!!!data) {
                            messageList.push({
                                code: Error_1.Errors.CONTROL_IMAGE_NOT_FOUND,
                                text: `image not found - could not found image: ${image}`,
                            });
                            continue;
                        }
                        result.push({ name: image, image: data });
                    }
                    resolve(result);
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }
    async _getList(query, messageList) {
        return new Promise((resolve) => {
            const result = { valid: false, all: [], selected: [] };
            const token = query.query["token"] && query.query["token"].toLowerCase();
            if (!!!token) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }
            const resource = path_1.default.resolve(Configures_1.baseDir, token, "setting.json");
            fs_1.default.readFile(resource, (error, rawData) => {
                if (error) {
                    messageList.push({ code: Error_1.Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    result.all = configJson.images;
                    result.selected = configJson.selected;
                    result.valid = true;
                    resolve(result);
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }
    async _getSelected(query, messageList) {
        return new Promise((resolve) => {
            const result = [];
            const token = query.query["token"] && query.query["token"].toLowerCase();
            if (!!!token) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve(result);
                return;
            }
            const resource = path_1.default.resolve(Configures_1.baseDir, token, "setting.json");
            fs_1.default.readFile(resource, (error, rawData) => {
                if (error) {
                    messageList.push({ code: Error_1.Errors.CONTROL_TOKEN_INVAILD, text: "invalid token" });
                    resolve(result);
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    result.push(...configJson.selected);
                    resolve(result);
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_RES_EXCEPTION,
                        text: "resource exception - could not handle required resource",
                    });
                    resolve(result);
                    return;
                }
            });
        });
    }
}
exports.GetterDispatcher = GetterDispatcher;
