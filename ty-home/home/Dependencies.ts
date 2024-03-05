/**@format */

export async function loader(): Promise<void> {
    const LanguageLoader = await import(/*webpackChunkName: "aitianyu-cn/global/home" */ "ty-infra/server/LanguageLoader");
    const FeatureToggleLoader = await import(
        /*webpackChunkName: "aitianyu-cn/global/home" */ "ty-infra/server/FeatureToggleLoader"
    );
    const PROJECT_DEF = await import(/*webpackChunkName: "aitianyu-cn/global/home" */ "ty-infra/project/Projects");
    const REMOTE_SERVER = require("ty-infra/server/remote-servers");

    const LoaderPromises = [
        LanguageLoader.loadLanguages(
            `${REMOTE_SERVER.AITIANYU_CN_GENERIC_SERVER}/aitianyu/cn/generic/language/language-alls`,
            true,
        ),
        FeatureToggleLoader.loadFeatureToggle([PROJECT_DEF.AITIANYU_CN_BASIC_PROJECT, PROJECT_DEF.AITIANYU_CN_HOME_PROJECT]),
    ];

    await Promise.all(LoaderPromises);
}
