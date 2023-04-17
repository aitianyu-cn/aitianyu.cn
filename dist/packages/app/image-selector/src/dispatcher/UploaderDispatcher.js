"use strict";
/**@format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderDispatcher = void 0;
const path_1 = __importDefault(require("path"));
const Error_1 = require("../common/Error");
const Configures_1 = require("../config/Configures");
const fs = __importStar(require("fs"));
class UploaderDispatcher {
    constructor() {
        //
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/image/selector/uploader", this._uploadImages.bind(this));
    }
    async _uploadImages(query, messageList) {
        return new Promise((resolve) => {
            const token = query.query["token"] && query.query["token"].toLowerCase();
            const safe = query.query["safe"];
            if (!!!token || !!!safe) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token",
                });
                resolve("failed");
                return;
            }
            const images = Array.isArray(query.query["images"])
                ? query.query["images"]
                : this._parseImages(query.query["images"]);
            if (0 === images.length) {
                resolve("success");
                return;
            }
            const basePath = path_1.default.resolve(Configures_1.baseDir, token);
            const resource = path_1.default.resolve(basePath, `setting.json`);
            fs.readFile(resource, { encoding: "utf-8" }, (error, rawData) => {
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
                    if (configJson.safe === safe) {
                        for (const imageItem of images) {
                            if (configJson.images.includes(imageItem.id)) {
                                continue;
                            }
                            configJson.images.push(imageItem.id);
                            try {
                                fs.writeFileSync(path_1.default.resolve(basePath, `${imageItem.id}.base64`), encodeURI(imageItem.data), {
                                    encoding: "utf-8",
                                });
                            }
                            catch {
                                messageList.push({
                                    code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                                    text: `save error - save image(${imageItem.id}) failed`,
                                });
                            }
                        }
                        if (images.length !== messageList.length) {
                            try {
                                fs.writeFileSync(resource, JSON.stringify(configJson), {
                                    encoding: "utf-8",
                                });
                            }
                            catch {
                                messageList.push({
                                    code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                                    text: "system error - handle resource failed",
                                });
                            }
                        }
                        resolve("success");
                    }
                    else {
                        messageList.push({
                            code: Error_1.Errors.CONTROL_AUTHORIZE_INVAID,
                            text: "access exception - invalid authorization",
                        });
                        resolve("failed");
                    }
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
    _parseImages(source) {
        try {
            return JSON.parse(source);
        }
        catch {
            return [];
        }
    }
}
exports.UploaderDispatcher = UploaderDispatcher;
