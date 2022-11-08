/**@format */

import { IMessageBundle } from "ts-core/I18n";

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
                    // icon: "/static/res/modules/navigation/home.png",
                    // iconType: "url",
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
                "/language": {
                    key: messageBundle.getText("HOME_PAGE_NAVIGATION_LANGUAGE"),
                    icon: SOURCES.language,
                    iconType: "inline",
                    assist: true,
                    index: -1,
                },
            };

            resolve(value);
        }, reject);
    });
}
