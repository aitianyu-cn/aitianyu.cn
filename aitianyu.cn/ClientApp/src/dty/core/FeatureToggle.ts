/**@format */

function isActive(feature: string): boolean {
    return !!(window as any).DTYFeature[feature];
}

export const FeatureToggle = {
    isActive: isActive,
};
