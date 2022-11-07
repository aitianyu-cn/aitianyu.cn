/**@format */

import { ReactHorizontalNavigation } from "tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation";

export const navigationSource: IReactNavigationSource = {
    "/home": {
        key: "主页",
        icon: "/static/res/modules/navigation/home.png",
        assist: false,
        index: 0,
    },
    "/download": {
        key: "下载",
        icon: "/static/res/modules/navigation/home.png",
        assist: false,
        index: 1,
    },
    "/docs": {
        key: "文档",
        icon: "/static/res/modules/navigation/home.png",
        assist: false,
        index: 2,
    },
    "/cloud": {
        key: "天宇云",
        icon: "/static/res/modules/navigation/home.png",
        assist: false,
        index: 3,
    },
    "/app": {
        key: "天宇应用程序",
        icon: "/static/res/modules/navigation/home.png",
        assist: false,
        index: 4,
    },
    "/language": {
        key: "Language",
        icon: "/static/res/modules/navigation/home.png",
        assist: true,
        index: -1,
    },
    "/user": {
        key: "User",
        icon: "/static/res/modules/navigation/home.png",
        assist: true,
        index: -1,
    },
};

export const fontSizeMap: Record<number, number> = {
    [0]: 15,
    [800]: 18,
    [1200]: 20,
};
