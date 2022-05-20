/**@format */

interface IFeatures {
    [feature: string]: boolean;
}

const Features: IFeatures = {};

export function initFeatures(): void {
    const features = require("../res/features.json");
    for (const feature of Object.keys(features)) {
        const featureState = features[feature];

        Features[feature] = featureState?.enable || false;
    }

    (window as any).DTYFeature = Features;
}
