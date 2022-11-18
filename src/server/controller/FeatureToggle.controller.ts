/**@format */

import { AITIANYU_CN_GENERIC_SERVER, AITIANYU_CN_OPERATION_SUCCESS, AITIANYU_CN_USER_SERVER } from "tianyu-server/Global";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { FeatureSourceList, MapOfType } from "ts-core/Types";

export async function loadFeatureToggle(projects: string[]): Promise<void> {
    return new Promise<void>((resolve) => {
        const postString = JSON.stringify(projects);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `/remote-connection/global/feature/getFeatures`);
        // xhr.open("POST", `${AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/features/feature-toggle`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const features = JSON.parse(response) as FeatureSourceList;
                if (!!features) {
                    FeatureToggle.loadFeatures(features);
                }
            }

            resolve();
        };
    });
}

export async function loadCustomizedFeatureToggles(): Promise<void> {
    return new Promise<void>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/feature-toggle`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send();
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const features = JSON.parse(response);
                if (!!features) {
                    for (const featureName of Object.keys(features)) {
                        const featureState = features[featureName];
                        if (typeof featureState === "boolean") {
                            if (featureState) FeatureToggle.enable(featureName);
                            else FeatureToggle.disable(featureName);
                        }
                    }
                }
            }

            resolve();
        };
    });
}

export async function saveCustomizedFeatureToggles(features: MapOfType<boolean>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const postString = JSON.stringify(features);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/feature-toggle`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                resolve(response === AITIANYU_CN_OPERATION_SUCCESS);
            } else {
                resolve(false);
            }
        };
    });
}
