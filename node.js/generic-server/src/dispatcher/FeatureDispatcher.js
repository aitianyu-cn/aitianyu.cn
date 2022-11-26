/**@format */

const DatabasePools = require("../../../common/service/DatabasePools");
const I18nReader = require("../../../common/i18n/I18nReader");
const HttpHandler = require("../../../common/handler/HttpHandler");
const { ERROR_CODE } = require("../../../common/common/Errors");

class FeatureDispatcher {
    /**
     *
     * @param {DatabasePools} dbPool
     */
    constructor(dbPool) {
        /**@type {DatabasePools} */
        this.databasePool = dbPool;
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        handler.setRouter("aitianyu/cn/generic/features/feature-toggle", this._featureToggleDispatcher.bind(this));
    }

    /**
     *
     * @param {{lang: string, query: any}} query
     * @param {string[]} messageList
     *
     * @return {Promise<any>}
     */
    async _featureToggleDispatcher(_query, messageList) {
        return new Promise((resolve) => {
            try {
                this.databasePool.execute(
                    "aitianyu_base",
                    "SELECT `name`, `enable`, `desc`, `dep`, `version`, `require` FROM aitianyu_base.feature;",
                    (results) => {
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
                                        if (!!depItem) featureItem.depFeature.push(depItem);
                                    }

                                    features[item.name] = featureItem;
                                } catch {}
                            }
                        }

                        resolve(features);
                    },
                    (error) => {
                        messageList.push({ code: ERROR_CODE.DATABASE_EXCEPTION, text: error });
                        resolve(null);
                    },
                );
            } catch (e) {
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: error });
                resolve(null);
            }
        });
    }
}

module.exports = FeatureDispatcher;
