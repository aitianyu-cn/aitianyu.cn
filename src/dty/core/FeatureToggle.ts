/**@format */

function isActive(feature: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(window as any).DTYFeature[feature];
}

export const FeatureToggle = {
    isActive: isActive,
};
