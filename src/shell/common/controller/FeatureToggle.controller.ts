/**@format */

import { FeatureToggle } from "ts-core/FeatureToggle";
import { FetchFileLoader } from "ts-core/FileLoader";
import { IFeatureSourceItem, MapOfType } from "ts-core/Types";

export async function loadFeatureToggle(url: string, ignoreFail?: boolean): Promise<void> {
    const fetchFile = new FetchFileLoader(url);

    return new Promise<void>((resolve, reject) => {
        fetchFile.openAsync().then((value: any) => {
            if (!!!value && !!!ignoreFail) {
                reject();
                return;
            }

            try {
                const featureSource: MapOfType<IFeatureSourceItem> = {};
                for (const feature of Object.keys(value || {})) {
                    const featureValue = value[feature];
                    featureSource[feature] = {
                        description: featureValue.description,
                        defaultOn: !!featureValue.enable,
                        version: "0000.00",
                        reqId: "0000",
                        depFeature: featureValue.dependency,
                    };
                }

                FeatureToggle.loadFeatures(featureSource);
                resolve();
            } catch (e) {
                reject();
            }
        });
    });
}
