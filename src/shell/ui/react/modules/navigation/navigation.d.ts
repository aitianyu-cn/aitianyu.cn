/**@format */

interface IReactNavigationSourceItem {
    key: string;
    icon: any;
    assist: boolean;
    index: number;
}

interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}
