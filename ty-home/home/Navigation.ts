/**@format */

import { MapOfType } from "@aitianyu.cn/types";
import { IReactContentRouter } from "ty-infra/ui/model/Content";
import { IReactNavigationSource } from "ty-infra/ui/model/Navigation";
import * as MessageBundle from "ty-home/i18n/MessageBundle";
import { LanguageFrame } from "ty-home/language/LanguageFrame";
import { ThemeFrame } from "ty-home/theme/ThemeFrame";
import { propCreater as ThemeFramePropCreater } from "ty-home/theme/ThemeFrame.controller";
import { HomeFrame } from "./HomeFrame";
import { propCreater as HomeFramePropCreater } from "./HomeFrame.controller";

export const fontSizeMap: Record<number, number> = {
    [0]: 15,
    [800]: 18,
    [1200]: 20,
};

export async function getNavigationSource(): Promise<IReactNavigationSource> {
    return new Promise<IReactNavigationSource>((resolve, reject) => {
        import("ty-home/res/home/exporter").then(({ SOURCES }) => {
            const value: IReactNavigationSource = {
                "/home": {
                    key: MessageBundle.getText("HOME_PAGE_NAVIGATION_HOME"),
                    icon: SOURCES.home,
                    iconType: "inline",
                    assist: false,
                    index: 0,
                },
                // "/download": {
                //     key: messageBundle.getText("HOME_PAGE_NAVIGATION_DOWNLOAD"),
                //     icon: SOURCES.download,
                //     iconType: "inline",
                //     assist: false,
                //     index: 1,
                // },
                // "/docs": {
                //     key: messageBundle.getText("HOME_PAGE_NAVIGATION_DOCUMENT"),
                //     icon: SOURCES.document,
                //     iconType: "inline",
                //     assist: false,
                //     index: 2,
                // },
                // "/tianyu": {
                //     key: messageBundle.getText("HOME_PAGE_NAVIGATION_INTERNAL"),
                //     icon: SOURCES.internal,
                //     iconType: "inline",
                //     assist: false,
                //     index: 3,
                // },
                "/language": {
                    key: MessageBundle.getText("HOME_PAGE_NAVIGATION_LANGUAGE"),
                    icon: SOURCES.language,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
                "/theme": {
                    key: MessageBundle.getText("HOME_PAGE_NAVIGATION_THEME"),
                    icon: SOURCES.theme,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
                // "/setting": {
                //     key: messageBundle.getText("HOME_PAGE_NAVIGATION_SETTING"),
                //     icon: SOURCES.setting,
                //     iconType: "inline",
                //     assist: true,
                //     index: -1,
                // },
            };

            resolve(value);
        }, reject);
    });
}

export async function getNavigationRouter(): Promise<MapOfType<IReactContentRouter>> {
    const contentRouter: MapOfType<IReactContentRouter> = {};

    contentRouter["/home"] = {
        component: HomeFrame,
        paramGenerater: HomeFramePropCreater,
        forceUpdate: false,
    };
    // contentRouter["/download"] = {
    //     component: DownloadFrame,
    //     paramGenerater: DownloadFramePropCreater,
    //     forceUpdate: false,
    // };
    // contentRouter["/docs"] = {
    //     component: DocumentFrame,
    //     paramGenerater: DocumentFramePropCreater,
    //     forceUpdate: false,
    // };
    // contentRouter["/tianyu"] = {
    //     component: InternalFrame,
    //     paramGenerater: InternalFramePropCreater,
    //     forceUpdate: false,
    // };
    contentRouter["/language"] = {
        component: LanguageFrame,
        paramGenerater: () => ({}),
        forceUpdate: false,
    };
    contentRouter["/theme"] = {
        component: ThemeFrame,
        paramGenerater: ThemeFramePropCreater,
        forceUpdate: false,
    };
    // contentRouter["/setting"] = {
    //     component: SettingFrame,
    //     paramGenerater: SettingFramePropCreater,
    //     forceUpdate: false,
    // };

    return contentRouter;
}

export async function getNavigationFallbackRouter(): Promise<IReactContentRouter> {
    return {
        component: HomeFrame,
        paramGenerater: HomeFramePropCreater,
        forceUpdate: true,
    };
}
