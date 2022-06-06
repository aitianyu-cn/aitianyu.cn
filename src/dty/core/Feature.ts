/**@format */

interface IFeatures {
    [feature: string]: boolean;
}

const Features: IFeatures = {};

export async function initFeatures(): Promise<void> {
    try {
        const response = await fetch("/global/feature/getFeatures");
        const features = await response.json();

        for (const feature of Object.keys(features)) {
            Features[feature] = getToggleState(features, feature);
        }
    } catch {
        //
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
