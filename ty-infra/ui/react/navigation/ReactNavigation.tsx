/**@format */

import React from "react";
import { isMobile, ICaptureRecorder, FeatureToggle, PerfCapture, Event, Log } from "@aitianyu.cn/tianyu-shell/core";
import { MapOfType, guid } from "@aitianyu.cn/types";
import { ReactNode } from "react";
import {
    IReactNavigationProps,
    IReactNavigationSource,
    REACT_NATIGATION_CLASSIFY,
    REACT_NAVIGATION_DEVELOP_TOGGLE,
    REACT_NAVIGATION_PERFORMANCE_TOGGLE,
} from "ty-infra/ui/model/Navigation";
import { ReactModule } from "../ReactModuleBase";
import { ReactNavigationItem } from "./ReactNavigationItem";
import { HashHelper } from "ty-infra/core/HashHelper";

import "../../css/navigation.css";

const REACT_NAVIGATION_ONRESIZE_LISTENER: string = "react-navigation-onresize-listener";
const REACT_NAVIGATION_ONHASHCHANGED_LISTENER: string = "react-navigation-onhashChanged-listener";

interface IHashMatchedItem {
    key: string;
    item: ReactNavigationItem;
}

export class ReactNavigation extends ReactModule<IReactNavigationProps> {
    public static FONT_SIZE_DEFAULT: number = 15;
    public static FONT_SIZE_MOBILE_DEFAULT: number = 18;

    protected id: string;

    protected itemSource: IReactNavigationSource;

    protected defaultItem: string;
    protected title: string;
    protected items: MapOfType<ReactNavigationItem>;
    protected currentPagHeight: number;
    protected currentPageWidth: number;

    protected inNarrowMode: boolean;
    protected isMobileMode: boolean;
    protected isNoMatched: boolean;

    private isLoaded: boolean;

    public constructor(props?: IReactNavigationProps) {
        super(props);

        this.id = guid();

        this.title = props?.props?.["title"]?.toString() || "";

        // format default item to ensure it is liked to /xxx/
        this.defaultItem = props?.props?.["defaultItem"]?.toString() || "";
        if (!this.defaultItem.startsWith("/")) this.defaultItem = `/${this.defaultItem}`;
        if (!this.defaultItem.endsWith("/")) this.defaultItem = `${this.defaultItem}/`;

        this.items = {};
        this.itemSource = {};
        this.isLoaded = false;
        this.inNarrowMode = false;
        this.isMobileMode = isMobile;
        this.isNoMatched = false;

        this.currentPagHeight = 0;
        this.currentPageWidth = 0;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        this.currentPagHeight = this.isMobileMode ? window.outerHeight : window.innerHeight;
        this.currentPageWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;

        Event.listenPageResize(REACT_NAVIGATION_ONRESIZE_LISTENER, this._onResize.bind(this));
        Event.listenHashChanged(REACT_NAVIGATION_ONHASHCHANGED_LISTENER, this.onHashChanged.bind(this));

        // to invoke hash changed directly to ensure the item selection is currect.
        this.onHashChanged();
        this.onLoaded();
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;

        Event.removelistenPageResize(REACT_NAVIGATION_ONRESIZE_LISTENER);
        Event.removelistenHashChanged(REACT_NAVIGATION_ONHASHCHANGED_LISTENER);
        this.onBeforeUnload();
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (this.isLoaded) {
            let perfCap: ICaptureRecorder | null = null;
            if (FeatureToggle.isActive(REACT_NAVIGATION_PERFORMANCE_TOGGLE)) {
                perfCap = PerfCapture.start(REACT_NATIGATION_CLASSIFY, "forceUpdate");
            }

            super.forceUpdate(() => {
                perfCap && PerfCapture.end(perfCap);
                callback?.();
            });
        }
    }

    public override render(): ReactNode {
        if (this.isMobileMode) return this.renderForMobile();

        this.inNarrowMode = (!this.isLoaded && this.isNarrow()) || this.inNarrowMode;
        if (this.inNarrowMode) {
            return this.renderForNarrow();
        }

        return this.renderForNormal();
    }

    public setSource(source: IReactNavigationSource, defaultItem?: string): void {
        this.defaultItem = defaultItem ? (source[defaultItem] ? defaultItem : this.defaultItem) : this.defaultItem;

        this.itemSource = source;
        this._updateItems();
        this.forceUpdate(() => {
            // when set the source and the navigation is updated
            // to fire the hash changed to update the selection of navigation item
            this.onHashChanged();
        });
    }

    protected isNarrow(): boolean {
        return false;
    }

    protected getSelectedItem(): ReactNavigationItem | null {
        for (const itemKey of Object.keys(this.items)) {
            const item = this.items[itemKey];
            if (item.getSelection()) {
                return item;
            }
        }

        return null;
    }

    private onHashChanged(): void {
        const fullMatch = HashHelper.getHashMappedItem(this.items, this.defaultItem, undefined, (item) => {
            item.setUnselect();
        });

        this.beforeHashChangedRender();

        if (fullMatch.value) {
            fullMatch.value.setSelect();
            this.isNoMatched = false;
            this.forceUpdate();
        } else if (!this.isNoMatched) {
            this.isNoMatched = true;
            this.forceUpdate();
        }
    }

    private _updateItems(): void {
        if (FeatureToggle.isActive(REACT_NAVIGATION_DEVELOP_TOGGLE)) {
            Log.debug(`(REACT-NATIVATION) - [${this.title}] - update items`);
        }

        this.updateItems();
    }

    private _onResize(): void {
        if (this.isSizeChanged()) {
            if (FeatureToggle.isActive(REACT_NAVIGATION_DEVELOP_TOGGLE)) {
                Log.debug(`(REACT-NATIVATION) - [${this.title}] - page resized to (${window.innerWidth}, ${window.innerHeight})`);
            }

            // before resize, to update the newest page height and width
            this.currentPagHeight = this.isMobileMode ? window.outerHeight : window.innerHeight;
            this.currentPageWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;
            this.onResize();
            this.forceUpdate();
        }
    }

    // ######################################################################
    // Sub-class implementation
    // ######################################################################

    /**
     * after set source, to update the navigation items
     *
     * in setting source, please do not fire forceUpdate due to it will be
     * called automatically.
     */
    protected updateItems(): void {
        // to implement in the child class
    }

    /**
     * on page resize event callback
     *
     * resize will be invoked only when not in mobile mode
     */
    protected onResize(): void {
        // to implement in the child class
    }

    /**
     * on component loaded
     *
     * replacement of componentDidMount()
     */
    protected onLoaded(): void {
        // to implement in the child class
    }

    protected isSizeChanged(): boolean {
        return true;
    }

    /**
     * before component unload
     *
     * replacement of componentWillUnmount()
     */
    protected onBeforeUnload(): void {
        // to implement in the child class
    }

    /**
     * render all elements for mobile.
     *
     * @returns {React.ReactNode} return react node
     */
    protected renderForMobile(): ReactNode {
        return <div></div>;
    }

    /**
     * render all elements for normal display case.
     *
     * @returns {React.ReactNode} return react node
     */
    protected renderForNormal(): ReactNode {
        return <div></div>;
    }

    /**
     * render all elements for narrow page case.
     *
     * @returns {React.ReactNode} return react node
     */
    protected renderForNarrow(): ReactNode {
        return <div></div>;
    }

    /**
     * when hash is changed, to trigger it before re-render
     */
    protected beforeHashChangedRender(): void {
        //
    }
}
