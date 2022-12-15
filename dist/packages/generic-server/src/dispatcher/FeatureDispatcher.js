"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureDispatcher = void 0;
const server_base_1 = require("@aitianyu.cn/server-base");
class FeatureDispatcher {
    constructor(dbPool) {
        this.databasePool = dbPool;
    }
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/generic/features/feature-toggle", this._featureToggleDispatcher.bind(this));
    }
    async _featureToggleDispatcher(_query, messageList) {
        return new Promise((resolve) => {
            try {
                this.databasePool.execute("aitianyu_base", "SELECT `name`, `enable`, `desc`, `dep`, `version`, `require` FROM aitianyu_base.feature;", (results) => {
                    const features = {};
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            try {
                                const depSrc = item.dep;
                                const featureItem = {
                                    description: encodeURI(item.desc),
                                    defaultOn: !!item.enable,
                                    version: item.version || "9999.99",
                                    reqId: item.require || "AITY-0000",
                                    depFeature: [],
                                };
                                const deps = (depSrc || "").trim().split(",");
                                for (const depItem of deps) {
                                    if (!!depItem)
                                        featureItem.depFeature.push(depItem);
                                }
                                features[item.name] = featureItem;
                            }
                            catch { }
                        }
                    }
                    resolve(features);
                }, (error) => {
                    messageList.push({ code: server_base_1.ERROR_CODE.DATABASE_EXCEPTION, text: error });
                    resolve(null);
                });
            }
            catch (e) {
                messageList.push({ code: server_base_1.ERROR_CODE.SYSTEM_EXCEPTIONS, text: e?.message || "" });
                resolve(null);
            }
        });
    }
}
exports.FeatureDispatcher = FeatureDispatcher;
