/**@format */

interface IFeatures {
    [feature: string]: boolean;
}

const Features: IFeatures = {};

export function initFeatures(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const features = require("../res/features.json");
    for (const feature of Object.keys(features)) {
        Features[feature] = getToggleState(features, feature);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).DTYFeature = Features;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getToggleState(features: any, featureName: string): boolean {
    const featureState = features[featureName];
    const featureDependency = featureState?.dependency;

    let bDependentFeatureState = true;
    if (featureDependency && Array.isArray(featureDependency)) {
        for (let i = 0; bDependentFeatureState && i < featureDependency.length; ++i) {
            bDependentFeatureState = getToggleState(features, featureDependency[i]);
        }
    }

    return bDependentFeatureState && (featureState?.enable || false);
}
