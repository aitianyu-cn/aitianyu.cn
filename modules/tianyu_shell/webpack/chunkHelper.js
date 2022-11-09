/**@format */

// #############################################################
// Chunk name
// #############################################################
const CoreChunk = "tianyu_shell/core";
const UIMajorChunk = "tianyu_shell/component/ui_major";
const UIMessageChunk = "tianyu_shell/component/ui_msg";
const UIDialogChunk = "tianyu_shell/component/ui_dialog";
const UIBackgroundChunk = "tianyu_shell/component/ui_bg";

const StorageChunk = "tianyu_shell/component/storage";
const FeatureToggleChunk = "tianyu_shell/component/featureToggle";
const LanguageChunk = "tianyu_shell/component/language";
const PerformanceChunk = "tianyu_shell/component/performance";

// #############################################################
// Chunk file
// #############################################################

const CoreChunkFile = "modules/tianyu_shell/resource/tianyu/Core.ts";
const UIMajorChunkFile = "modules/tianyu_shell/resource/tianyu/ui/Major.ts";
const UIMessageChunkFile = "modules/tianyu_shell/resource/tianyu/ui/Message.ts";
const UIDialogChunkFile = "modules/tianyu_shell/resource/tianyu/ui/Dialog.ts";
const UIBackgroundChunkFile = "modules/tianyu_shell/resource/tianyu/ui/Background.ts";

const StorageChunkFile = "modules/tianyu_shell/resource/tianyu/Storage.ts";
const FeatureToggleChunkFile = "modules/tianyu_shell/resource/tianyu/FeatureToggle.ts";
const LanguageChunkFile = "modules/tianyu_shell/resource/tianyu/Language.ts";
const PerformanceChunkFile = "modules/tianyu_shell/resource/tianyu/Performance.ts";

const defaultChunks = [CoreChunk, UIMajorChunk];

const tianyuShellConfigHandler = function (tsConfig) {
    if (!!!tsConfig) {
        return [];
    }

    // the function of mounting the ui config part
    const fnUIHandler = (uiConfig) => {
        if (!!!uiConfig) return [];

        const uiChunks = [];

        uiConfig.message && uiChunks.push(UIMessageChunk);
        uiConfig.dialog && uiChunks.push(UIDialogChunk);
        uiConfig.background && uiChunks.push(UIBackgroundChunk);

        return uiChunks;
    };

    const chunks = [];

    // to check the ui config and load it.
    const uiConfig = tsConfig.ui;
    chunks.push(...fnUIHandler(uiConfig));

    // to check the performace supportable and load it if needs.
    const performanceConfig = tsConfig.performance;
    performanceConfig && chunks.push(PerformanceChunk);

    // to check the multiple language supportable and load it if needs.
    const languageConfig = tsConfig.language;
    languageConfig && chunks.push(LanguageChunk);

    // to check the storage supportable and load it if needs.
    const storageConfig = tsConfig.storage;
    storageConfig && chunks.push(StorageChunk);

    // to check the feature toggle supportable and load it if needs.
    const featureToggleConfig = tsConfig.featureToggle;
    featureToggleConfig && chunks.push(FeatureToggleChunk);

    return chunks;
};

const tianyuShellChunkProcessor = function (tianyuShell) {
    // detect whether the config field is defined.
    if (!!!tianyuShell) {
        return [...defaultChunks]; // if the field is not defined, to set the default chunk.
    }

    // if the coreSupport is absolutely disabled, do not to set the tianyu-shell chunks.
    if (tianyuShell.coreSupport === false) {
        return [];
    }

    // otherwise, the tianyu-shell core chunk is the core part of the whole additional chunks.
    const additionalChunks = [...defaultChunks];

    // check the config part and to mount it.
    const config = tianyuShell.config;
    additionalChunks.push(...tianyuShellConfigHandler(config));

    return additionalChunks;
};

module.exports.TianyuShellChunks = {
    Chunks: {
        CORE: CoreChunk,
        UI_MAJOR: UIMajorChunk,
        UI_MESSAGE: UIMessageChunk,
        UI_DIALOG: UIDialogChunk,
        UI_BACKGROUND: UIBackgroundChunk,
        STORAGE: StorageChunk,
        FEATURE_TOGGLE: FeatureToggleChunk,
        LANGUAGE: LanguageChunk,
        PERFORMANCE: PerformanceChunk,
    },
    ChunkFiles: {
        CORE: CoreChunkFile,
        UI_MAJOR: UIMajorChunkFile,
        UI_MESSAGE: UIMessageChunkFile,
        UI_DIALOG: UIDialogChunkFile,
        UI_BACKGROUND: UIBackgroundChunkFile,
        STORAGE: StorageChunkFile,
        FEATURE_TOGGLE: FeatureToggleChunkFile,
        LANGUAGE: LanguageChunkFile,
        PERFORMANCE: PerformanceChunkFile,
    },
    Processor: tianyuShellChunkProcessor,
};
