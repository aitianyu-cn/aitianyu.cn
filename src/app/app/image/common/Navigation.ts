/**@format */

import { IReactContentRouter } from "tianyu-shell/ui/react/modules/content/Interface";
import { IMessageBundle } from "ts-core/I18n";
import { MapOfType } from "ts-core/Types";

import { ImageHomeFrame, propCreater as ImageHomePropCreater } from "tianyu-shell/app/image/Home.loader";

export const fontSizeMap: Record<number, number> = {
    [0]: 15,
    [800]: 18,
    [1200]: 20,
};

export async function getNavigationSource(messageBundle: IMessageBundle): Promise<IReactNavigationSource> {
    const SOURCES = (await import("tianyu-res/app/image/exporter")).SOURCES;
    const value: IReactNavigationSource = {
        "/home": {
            key: messageBundle.getText("IMAGE_PAGE_NAVIGATION_HOME"),
            icon: SOURCES.home,
            iconType: "inline",
            assist: false,
            index: 0,
        },
        "/gallery": {
            key: messageBundle.getText("IMAGE_PAGE_NAVIGATION_GALLERY"),
            icon: SOURCES.gallery,
            iconType: "inline",
            assist: false,
            index: 0,
        },
        "/educate": {
            key: messageBundle.getText("IMAGE_PAGE_NAVIGATION_EDUCATE"),
            icon: SOURCES.educate,
            iconType: "inline",
            assist: false,
            index: 0,
        },

        "/language": {
            key: messageBundle.getText("IMAGE_PAGE_NAVIGATION_LANGUAGE"),
            icon: SOURCES.language,
            iconType: "inline",
            assist: true,
            index: -1,
        },
        "/theme": {
            key: messageBundle.getText("IMAGE_PAGE_NAVIGATION_THEME"),
            icon: SOURCES.theme,
            iconType: "inline",
            assist: true,
            index: -1,
        },
    };

    return value;
}

export async function getNavigationRouter(): Promise<MapOfType<IReactContentRouter>> {
    const GALLERYPAGE = await import("tianyu-shell/app/image/Gallery.loader");
    const EDUCATEPAGE = await import("tianyu-shell/app/image/Educate.loader");
    const LANGUAGEPAGE = await import("tianyu-shell/app/general/language/LanguageFrame");
    const THEMEPAGE = await import("tianyu-shell/app/general/Theme.loader");

    const contentRouter: MapOfType<IReactContentRouter> = {};

    contentRouter["/home"] = {
        component: ImageHomeFrame,
        paramGenerater: ImageHomePropCreater,
        forceUpdate: false,
    };

    contentRouter["/gallery"] = {
        component: GALLERYPAGE.ImageGalleryFrame,
        paramGenerater: GALLERYPAGE.propCreater,
        forceUpdate: false,
    };

    contentRouter["/educate"] = {
        component: EDUCATEPAGE.ImageGalleryFrame,
        paramGenerater: EDUCATEPAGE.propCreater,
        forceUpdate: false,
    };
    contentRouter["/language"] = {
        component: LANGUAGEPAGE.LanguageFrame,
        paramGenerater: () => ({}),
        forceUpdate: false,
    };
    contentRouter["/theme"] = {
        component: THEMEPAGE.ThemeFrame,
        paramGenerater: THEMEPAGE.propCreater,
        forceUpdate: false,
    };

    return contentRouter;
}

export async function getNavigationFallbackRouter(): Promise<IReactContentRouter> {
    return {
        component: ImageHomeFrame,
        paramGenerater: ImageHomePropCreater,
        forceUpdate: true,
    };
}
