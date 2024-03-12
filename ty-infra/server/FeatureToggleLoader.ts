/**@format */

import { FeatureSource, FeatureToggle } from "@aitianyu.cn/tianyu-shell/core";
import { MapOfType } from "@aitianyu.cn/types";
import { AITIANYU_CN_OPERATION_SUCCESS } from "./model/OperationResult";

const REMOTE_SERVER = require("./remote-servers");

export async function loadFeatureToggle(projects: string[]): Promise<void> {
    return new Promise<void>((resolve) => {
        const postString = JSON.stringify(projects);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${REMOTE_SERVER.AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/features/feature-toggle`);
        // xhr.open("POST", `${AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/features/feature-toggle`);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.send(postString);
        xhr.onloadend = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.responseText;
                const resObj = JSON.parse(response);
                const features = resObj.response as FeatureSource;
                if (!!features) {
                    for (const featureName of Object.keys(features)) {
                        const featureItem = features[featureName];
                        featureItem.description = decodeURI(featureItem.description);
                    }
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
        xhr.open("GET", `${REMOTE_SERVER.AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/feature-toggle`);
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
        xhr.open("POST", `${REMOTE_SERVER.AITIANYU_CN_USER_SERVER}/aitianyu/cn/user/feature-toggle`);
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
