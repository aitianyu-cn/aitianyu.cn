/**@format */

import { DatabasePools, ERROR_CODE, HttpHandler, IHttpQuery, IHttpResponseError, MapOfType } from "aitianyu-server-base";

export class FeatureDispatcher {
    private databasePool: DatabasePools;

    public constructor(dbPool: DatabasePools) {
        this.databasePool = dbPool;
    }

    public createDispatches(handler: HttpHandler) {
        handler.setRouter("aitianyu/cn/generic/features/feature-toggle", this._featureToggleDispatcher.bind(this));
    }

    private async _featureToggleDispatcher(_query: IHttpQuery, messageList: IHttpResponseError[]): Promise<any> {
        return new Promise((resolve) => {
            try {
                this.databasePool.execute(
                    "aitianyu_base",
                    "SELECT `name`, `enable`, `desc`, `dep`, `version`, `require` FROM aitianyu_base.feature;",
                    (results: any[]) => {
                        const features: MapOfType<any> = {};
                        if (Array.isArray(results)) {
                            for (const item of results) {
                                try {
                                    const depSrc = item.dep;
                                    const featureItem: any = {
                                        description: encodeURI(item.desc),
                                        defaultOn: !!item.enable,
                                        version: item.version || "9999.99",
                                        reqId: item.require || "AITY-0000",
                                        depFeature: [],
                                    };

                                    const deps: string = (depSrc || "").trim().split(",");
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
                messageList.push({ code: ERROR_CODE.SYSTEM_EXCEPTIONS, text: (e as any)?.message || "" });
                resolve(null);
            }
        });
    }
}
