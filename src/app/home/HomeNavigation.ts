/**@format */

import { DocumentFrame, propCreater as DocumentFramePropCreater } from "tianyu-shell/app/home/Document.loader";
import { DownloadFrame, propCreater as DownloadFramePropCreater } from "tianyu-shell/app/home/Download.loader";
import { HomeFrame, propCreater as HomeFramePropCreater } from "tianyu-shell/app/home/Home.loader";
import { InternalFrame, propCreater as InternalFramePropCreater } from "tianyu-shell/app/home/Internal.loader";
import { SettingFrame, propCreater as SettingFramePropCreater } from "tianyu-shell/app/home/Setting.loader";
import { ThemeFrame, propCreater as ThemeFramePropCreater } from "tianyu-shell/app/home/Theme.loader";
import { LanguageFrame } from "tianyu-shell/app/home/language/LanguageFrame";
import { IReactContentRouter } from "tianyu-shell/ui/react/modules/content/Interface";
import { IMessageBundle } from "ts-core/I18n";
import { MapOfType } from "ts-core/Types";
import { TestComp } from "./TestComp";

export const fontSizeMap: Record<number, number> = {
    [0]: 15,
    [800]: 18,
    [1200]: 20,
};

export async function getNavigationSource(messageBundle: IMessageBundle): Promise<IReactNavigationSource> {
    return new Promise<IReactNavigationSource>((resolve, reject) => {
        import("tianyu-res/home/exporter").then(({ SOURCES }) => {
            const value: IReactNavigationSource = {
                "/home": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_HOME"),
                    icon: SOURCES.home,
                    iconType: "inline",
                    assist: false,
                    index: 0,
                },
                "/download": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_DOWNLOAD"),
                    icon: SOURCES.download,
                    iconType: "inline",
                    assist: false,
                    index: 1,
                },
                "/docs": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_DOCUMENT"),
                    icon: SOURCES.document,
                    iconType: "inline",
                    assist: false,
                    index: 2,
                },
                "/tianyu": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_INTERNAL"),
                    icon: SOURCES.internal,
                    iconType: "inline",
                    assist: false,
                    index: 3,
                },
                "/language": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_LANGUAGE"),
                    icon: SOURCES.language,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
                "/theme": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_THEME"),
                    icon: SOURCES.theme,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
                "/setting": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_SETTING"),
                    icon: SOURCES.setting,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
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
    contentRouter["/download"] = {
        component: DownloadFrame,
        paramGenerater: DownloadFramePropCreater,
        forceUpdate: false,
    };
    contentRouter["/docs"] = {
        component: DocumentFrame,
        paramGenerater: DocumentFramePropCreater,
        forceUpdate: false,
    };
    contentRouter["/tianyu"] = {
        component: InternalFrame,
        paramGenerater: InternalFramePropCreater,
        forceUpdate: false,
    };
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
    contentRouter["/setting"] = {
        component: SettingFrame,
        paramGenerater: SettingFramePropCreater,
        forceUpdate: false,
    };

    return contentRouter;
}

export async function getNavigationFallbackRouter(): Promise<IReactContentRouter> {
    return {
        component: TestComp,
        paramGenerater: () => {
            return { data: "failure" };
        },
        forceUpdate: true,
    };
}
