/**@format */

import React from "react";
import { Configure } from "src/dty/core/Configure";
import { guid } from "src/dty/Guid";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { RequestError } from "./RequestError";
import { RequestWaiting } from "./RequestWaiting";

import "./css/dynamic.page.css";
import { FeatureToggle } from "src/dty/core/FeatureToggle";

const DefaultDynamicPageCacheFlush = 300000;

export abstract class TYDynamicPage extends TYViewComponent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private oReceive: any;

    private sPageKey: string;
    private hasCache: boolean;
    private staticCache: boolean;
    private cacheFlush: number;

    private isLoaded: boolean;
    private hasError: boolean;

    private fetchRemote: string | null;

    public constructor(props: IShellProperty) {
        super(props);

        document.title = this.msgBundle.getI18n(props["title"].toString() || "个人编程学习");
        if (this.initPage && this.initPage instanceof Function) {
            this.initPage();
        }

        this.fetchRemote = props["remote"] && typeof props["remote"] === "string" ? props["remote"] : null;

        let iWaitTime = 0;
        if (props["waitTime"]) {
            switch (typeof props["waitTime"]) {
                case "number":
                    iWaitTime = props["waitTime"];
                    break;
                case "string":
                    iWaitTime = Number.isInteger(props["waitTime"]) ? Number.parseInt(props["waitTime"]) : 0;
                    break;
                default:
                    break;
            }
        }

        this.waitOvertime = iWaitTime;

        this.cacheFlush = 0;
        this.hasCache = FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_CACHE") && !!props["cache"];
        this.staticCache = FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_STATIC") && !!props["staticCache"];
        this.sPageKey = props["key"] && typeof props["key"] === "string" ? props["key"] : guid();

        this.isLoaded = false;
        this.hasError = false;
    }

    protected getIsLoaded(): boolean {
        return this.isLoaded;
    }

    protected getHasError(): boolean {
        return this.hasError;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected getReceiveData(): any {
        return this.oReceive;
    }

    protected abstract renderLoaded(): React.ReactNode;

    protected loadDataSuccess(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected loadDataFailed(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    public componentDidMount(): void {
        this.componmentMounted();
        this.isLoaded = this.getDataFromCache();

        if (this.hasError || this.isLoaded) {
            if (this.isLoaded && this.hasCache) {
                if (this.loadDataSuccess && this.loadDataSuccess instanceof Function) {
                    this.loadDataSuccess();
                }
                !this.staticCache && this.startCacheFlush();
            }

            this.forceUpdate();
            return;
        }

        this.loadData();
    }

    protected componmentMounted(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected componmentWillUnmounted(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    public componentWillUnmount(): void {
        this.componmentWillUnmounted();
        this.endCacheFlush();
    }

    public render(): React.ReactNode {
        if (this.hasError) {
            return <div className="dynamic_page_baseGrid">{this.renderError()}</div>;
        } else if (!this.isLoaded) {
            return <div className="dynamic_page_baseGrid">{this.renderWaiting()}</div>;
        }

        return <div className="dynamic_page_loaded_grid">{this.renderLoaded()}</div>;
    }

    private renderWaiting(): React.ReactNode {
        return <RequestWaiting />;
    }

    private renderError(): React.ReactNode {
        const reqErrorPage = new RequestError(this.props);
        reqErrorPage.setRetry(this.onErrorRetry.bind(this));

        return reqErrorPage.render();
    }

    private async loadData(): Promise<void> {
        try {
            if (this.fetchRemote) {
                const response = await fetch(this.fetchRemote);
                this.oReceive = await response.json();
            }

            if (this.loadDataSuccess && this.loadDataSuccess instanceof Function) {
                this.loadDataSuccess();
            }

            const config = Configure.generateConfigure();
            const storage = config.getStorage();
            storage.setValue(this.sPageKey, this.oReceive, true);

            this.isLoaded = true;
            if (this.isLoaded && this.hasCache && !this.staticCache) {
                this.startCacheFlush();
            }
            this.hasError = false;
        } catch {
            if (this.loadDataFailed && this.loadDataFailed instanceof Function) {
                this.loadDataFailed();
            }

            this.isLoaded = false;
            this.hasError = true;
        }

        this.forceUpdate();
    }

    private getDataFromCache(): boolean {
        if (!this.hasCache) {
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cacheValue: any;

        if (this.staticCache) {
            cacheValue = window.localStorage[this.sPageKey];
        } else {
            const config = Configure.generateConfigure();
            const storage = config.getStorage();

            cacheValue = storage.getValue(this.sPageKey);
        }

        if (cacheValue) {
            this.oReceive = cacheValue;
            return true;
        }

        return false;
    }

    private async onErrorRetry(): Promise<void> {
        // reset loaded state and error state
        this.isLoaded = false;
        this.hasError = false;

        this.forceUpdate();

        this.loadData();
    }

    private startCacheFlush(): void {
        this.endCacheFlush();

        this.cacheFlush = window.setInterval(this.flushCache.bind(this), DefaultDynamicPageCacheFlush);
    }

    private endCacheFlush(): void {
        if (this.cacheFlush) {
            window.clearInterval(this.cacheFlush);
        }
    }

    private flushCache(): void {
        const config = Configure.generateConfigure();
        const storage = config.getStorage();

        storage.updateStamp(this.sPageKey);
    }
}
