/**@format */

interface IReactNavigationSourceItem {
    key: string;
    icon: string;
}

interface IReactNavigationSource {
    [router: string]: IReactNavigationSourceItem;
}
