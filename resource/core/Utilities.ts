/**@format */

// ########################################################
// Validation
// To check the TianyuShell Components state
// ########################################################

export function validateTianyuShell(): boolean {
    return !!tianyuShell;
}

export function validateTianyuShellCore(): boolean {
    return !!tianyuShell?.core;
}

export function validateTianyuShellFeatureToggle(): boolean {
    return !!tianyuShell?.core?.featureToggle;
}

export function validateTianyuShellLanguage(): boolean {
    return !!tianyuShell?.core?.language;
}

export function validateTianyuShellPerformace(): boolean {
    return !!tianyuShell?.core?.performance;
}
