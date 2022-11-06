/**@format */

import { TianyuShellLostException, TianyuShellFeatureToggleLost } from "./ExceptionBase";
import { FeatureSourceList, IFeature, MapOfBoolean } from "./Types";
import { validateTianyuShellFeatureToggle } from "./Utilities";

export class FeatureToggle {
    public static addFeature(featureName: string): void {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        tianyuShell.core.featureToggle?.addFeature(featureName);
    }

    public static addStoreFeatures(features: IFeature[]): void {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        tianyuShell.core.featureToggle?.addStoreFeatures(features);
    }

    public static allFeatures(): MapOfBoolean {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        return tianyuShell.core.featureToggle?.allFeatures() || {};
    }

    public static enable(featureName: string, enableDepFeatures: boolean = false): void {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        tianyuShell.core.featureToggle?.enable(featureName, enableDepFeatures);
    }

    public static disable(featureName: string, disableDepFeatures: boolean = false): void {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        tianyuShell.core.featureToggle?.disable(featureName, disableDepFeatures);
    }

    public static isActive(featureName: string): boolean {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        return !!tianyuShell.core.featureToggle?.isActive(featureName);
    }

    public static contains(featureName: string): boolean {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        return !!tianyuShell.core.featureToggle?.contains(featureName);
    }

    public static loadFeatures(features: FeatureSourceList): void {
        if (!validateTianyuShellFeatureToggle()) {
            throw new TianyuShellLostException(TianyuShellFeatureToggleLost);
        }

        tianyuShell.core.featureToggle?.loadFeatures(features);
    }
}
