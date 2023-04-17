/**@format */

type ReactNavigationSourceIconType = "url" | "inline";

interface IReactNavigationSourceItem {
    key: string;
    icon: any;
    iconType: ReactNavigationSourceIconType;
    assist: boolean;
    index: number;
    url?: string;
}

interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}
