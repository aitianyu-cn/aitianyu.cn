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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlDispatcher = void 0;
const types_1 = require("@aitianyu.cn/types");
const Error_1 = require("../common/Error");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Configures_1 = require("../config/Configures");
class ControlDispatcher {
    constructor() {
        //
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/app/image/selector/createToken", this._createToken.bind(this));
        handler.setRouter("aitianyu/cn/app/image/selector/releaseToken", this._releaseToken.bind(this));
    }
    async _createToken(query, messageList) {
        return new Promise((resolve) => {
            const name = query.query["name"];
            const safe = query.query["safe"];
            if (!!!name || !!!safe) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require name and safe item in query",
                });
                resolve("");
                return;
            }
            const token = (0, types_1.guid)();
            const sourcePath = path.resolve(Configures_1.baseDir, token);
            if (!fs.existsSync(sourcePath)) {
                try {
                    fs.mkdirSync(sourcePath, { recursive: true });
                }
                catch {
                    messageList.push({
                        code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                        text: "system error - generate resource failed",
                    });
                    resolve("");
                    return;
                }
            }
            const configJson = {
                name: name,
                safe: safe,
                images: [],
                selected: [],
            };
            try {
                fs.writeFileSync(path.resolve(sourcePath, `setting.json`), JSON.stringify(configJson), {
                    encoding: "utf-8",
                });
            }
            catch {
                messageList.push({
                    code: Error_1.Errors.CONTROL_CREATE_TOKEN_RES_GENERATE,
                    text: "system error - generate resource failed",
                });
                resolve("");
                return;
            }
            resolve(token);
        });
    }
    async _releaseToken(query, messageList) {
        return new Promise((resolve) => {
            const token = query.query["token"];
            const safe = query.query["safe"];
            if (!!!token || !!!safe) {
                messageList.push({
                    code: Error_1.Errors.CONTROL_TOKEN_PARAM_LOST,
                    text: "no matched parameter - require token and safe item in query",
                });
                resolve("failed");
                return;
            }
            const basePath = path.resolve(Configures_1.baseDir, token);
            const resource = path.resolve(basePath, `setting.json`);
            fs.readFile(resource, (error, rawData) => {
                if (error) {
                    resolve("invalid-token");
                    return;
                }
                const data = typeof rawData === "string" ? rawData : rawData.toString("utf-8");
                try {
                    const configJson = JSON.parse(data);
                    if (configJson.safe !== safe) {
                        resolve("invalid-safe");
                        return;
                    }
                    fs.rm(basePath, { recursive: true }, (error) => {
                        resolve(error ? "failed" : "success");
                    });
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
exports.ControlDispatcher = ControlDispatcher;
