"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.guid = void 0;
const perf_hooks_1 = require("perf_hooks");
function guid() {
    let d = new Date().getTime();
    d += perf_hooks_1.performance.now(); //use high-precision timer if available
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0; // d是随机种子
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
exports.guid = guid;
