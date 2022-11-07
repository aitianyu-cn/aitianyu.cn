/**@format */

interface IReactNavigationSourceItem {
    key: string;
    icon: string;
    assist: boolean;
    index: number;
}

interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}
