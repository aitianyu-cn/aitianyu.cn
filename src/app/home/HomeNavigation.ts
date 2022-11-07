/**@format */

import { ReactHorizontalNavigation } from "tianyu-shell/ui/react/modules/navigation/ReactHorizontalNavigation";

const navigationSource: IReactNavigationSource = {
    "/home": {
        key: "主页",
        icon: "",
        assist: false,
        index: 0,
    },
    "/download": {
        key: "下载",
        icon: "",
        assist: false,
        index: 1,
    },
    "/docs": {
        key: "文档",
        icon: "",
        assist: false,
        index: 2,
    },
    "/t1": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t2": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t3": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t4": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t5": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t6": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t7": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/t8": {
        key: "AAA",
        icon: "",
        assist: false,
        index: -1,
    },
    "/language": {
        key: "语言",
        icon: "",
        assist: true,
        index: -1,
    },
    "/user": {
        key: "用户",
        icon: "",
        assist: true,
        index: -1,
    },
};

const fontSizeMap: Record<number, number> = {
    [0]: 15,
    [800]: 18,
    [1200]: 20,
};

export class HomeNavigation extends ReactHorizontalNavigation {
    public constructor(props?: IReactProperty) {
        super(props);

        this.setWidthToFontSizeMap(fontSizeMap);
        this.setSource(navigationSource);
    }
}
