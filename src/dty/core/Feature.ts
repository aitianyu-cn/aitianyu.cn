/**@format */

interface IFeatures {
    [feature: string]: boolean;
}

const Features: IFeatures = {};

export function initFeatures(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const features = require("../res/features.json");
    for (const feature of Object.keys(features)) {
        const featureState = features[feature];

        Features[feature] = featureState?.enable || false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).DTYFeature = Features;
}
