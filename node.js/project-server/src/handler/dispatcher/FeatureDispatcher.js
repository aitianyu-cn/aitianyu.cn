/**@format */

const DatabasePools = require("../../service/DatabasePools");
const I18nReader = require("../../i18n/I18nReader");
const HttpHandler = require("../HttpHandler");

class FeatureDispatcher {
    /**
     *
     * @param {DatabasePools} dbPool
     * @param {I18nReader} i18n
     */
    constructor(dbPool, i18n) {
        this.databasePool = dbPool;
        this.i18nReader = i18n;
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
            this.databasePool.execute(
                "aitianyu_base",
                "SELECT `name`, `enable`, `desc`, `dep` FROM aitianyu_base.feature;",
                (results) => {
                    const features = {};
                    if (Array.isArray(results)) {
                        for (const item of results) {
                            try {
                                const depSrc = item.dep;
                                const featureItem = {
                                    description: item.name,
                                    defaultOn: !!item.enable,
                                    version: "",
                                    reqId: "",
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
                    messageList.push(error);
                    resolve(null);
                },
            );
        });
    }
}

module.exports = FeatureDispatcher;
