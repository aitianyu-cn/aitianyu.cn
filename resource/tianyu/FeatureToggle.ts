/**@format */

import { FeatureSourceList, IFeature, MapOfBoolean, MapOfStrings } from "../core/Types";

export {};

const _features: MapOfBoolean = {};
const _dependentFeatures: MapOfStrings = {};

const _featureContains = (featureName: string): boolean => {
    return Object.keys(_features).includes(featureName);
};

const _setDepFeatures = (featureName: string, state: boolean): void => {
    const depFeatures = _dependentFeatures[featureName] || [];
    for (const depFeature of depFeatures) {
        if (!_featureContains(depFeature)) {
            continue;
        }
        _setDepFeatures(depFeature, state);
        _features[featureName] = state;
    }
};

const _processToggleState = (features: FeatureSourceList, featureName: string): boolean => {
    if (_featureContains(featureName)) {
        return _features[featureName];
    }

    const featureState = features[featureName];
    const featureDependency = featureState.depFeature;

    let bDependentFeatureState = true;
    if (featureDependency) {
        for (let i = 0; bDependentFeatureState && i < featureDependency.length; ++i) {
            bDependentFeatureState = _processToggleState(features, featureDependency[i]);
        }
    }

    return bDependentFeatureState && featureState.defaultOn;
};

const featureToggleBase: ITianyuShellFeatureToggle = {
    addFeature: function (featureName: string): void {
        if (_featureContains(featureName)) {
            return;
        }

        _features[featureName] = false;
    },

    addStoreFeatures: function (features: IFeature[]): void {
        for (const feature of features) {
            if (_featureContains(feature.name)) {
                continue;
            }

            _features[feature.name] = feature.isActive;
            _dependentFeatures[feature.name] = feature.depFeature;
        }
    },

    allFeatures: function (): MapOfBoolean {
        return _features;
    },

    enable: function (featureName: string, enableDepFeatures: boolean = false): void {
        if (!_featureContains(featureName)) {
            return;
        }

        if (enableDepFeatures) {
            _setDepFeatures(featureName, true);
        }

        _features[featureName] = true;
    },

    disable: function (featureName: string, disableDepFeatures: boolean = false): void {
        if (!_featureContains(featureName)) {
            return;
        }

        if (disableDepFeatures) {
            _setDepFeatures(featureName, false);
        }

        _features[featureName] = false;
    },

    isActive: function (featureName: string): boolean {
        if (!_featureContains(featureName)) {
            return false;
        }

        return _features[featureName];
    },

    contains: function (featureName: string): boolean {
        return _featureContains(featureName);
    },

    loadFeatures: function (features: FeatureSourceList): void {
        for (const featureName of Object.keys(features)) {
            if (_featureContains(featureName)) {
                continue;
            }
            const state = _processToggleState(features, featureName);
            _features[featureName] = state;
        }
    },
};

async function initiation(): Promise<void> {
    tianyuShell.core.featureToggle = featureToggleBase;

    const configure = await tianyuShell.core.cache.static.load("configuration.json");
    featureToggleBase.addFeature("TIANYU_SHELL_CONSOLE_LOG");
    if (configure?.environment === "development") {
        featureToggleBase.enable("TIANYU_SHELL_CONSOLE_LOG");
    }
}

initiation();
