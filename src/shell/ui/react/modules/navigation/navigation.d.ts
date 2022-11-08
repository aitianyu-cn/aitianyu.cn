/**@format */

type ReactNavigationSourceIconType = "url" | "inline";

interface IReactNavigationSourceItem {
    key: string;
    icon: any;
    iconType: ReactNavigationSourceIconType;
    assist: boolean;
    index: number;
}

interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}
