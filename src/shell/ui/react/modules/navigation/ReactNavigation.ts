/**@format */
import { MapOfType } from "ts-core/Types";
import { ReactModule } from "../ReactModuleBase";
import { ReactNavigationItem } from "./ReactNavigationItem";

import "./css/navigation.css";

export class ReactNavigation extends ReactModule {
    protected itemSource: IReactNavigationSource;
    protected defaultItem: string;
    protected title: string;
    protected items: MapOfType<ReactNavigationItem>;

    public constructor(props?: IReactProperty) {
        super(props);

        this.title = props?.["title"].toString() || "";
        this.defaultItem = props?.["defaultItem"].toString() || "";

        this.items = {};
        this.itemSource = {};
    }

    public setSource(source: IReactNavigationSource, defaultItem?: string): void {
        this.defaultItem = defaultItem || this.defaultItem;

        this.itemSource = source;
        this.updateItems();
    }
    public updateItems(): void {
        // to implement in the child class
    }
}
