/**@format */

import React from "react";
import { ConfigureController } from "tianyu-shell/common/controller/Configure.controller";
import { FeatureToggle } from "ts-core/FeatureToggle";
import { guid } from "ts-core/Guid";

import "./css/dynamic.page.css";
import { RequestError } from "./lib/RequestError";
import { RequestWaiting } from "./lib/RequestWaiting";

export enum DynamicInvalidTargetState {
    Failed,
    Reload,
}

const DefaultDynamicPageCacheFlush = 300000;

export interface IReactDynamicPageProperty {
    id: string;
    title: string;
    remote: string;
    waitTime: number;
    cache: boolean;
    staticCache: boolean;
    key: string;
    fetchResult: "text" | "json";
}

export abstract class ReactDynamicPage<T extends IReactDynamicPageProperty> extends React.Component<T, IReactState> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private oReceive: any;

    protected sId: string | null;

    private sPageKey: string;
    private sPageKeyStatic: string;
    private bGuidPageKey: boolean;
    private hasCache: boolean;
    private staticCache: boolean;
    private cacheFlush: number;

    private isLoaded: boolean;
    private hasError: boolean;

    private fetchRemote: string | null;
    private fetchRemoteStatic: string | null;

    private fetchText: boolean;

    public constructor(props: T) {
        super(props);

        this.initPage();

        this.fetchText = props.fetchResult === "text";

        document.title = props.title;

        this.sId = props.id;
        this.fetchRemoteStatic = this.fetchRemote = props.remote;

        let iWaitTime = props.waitTime;

        this.waitOvertime = iWaitTime;

        this.cacheFlush = 0;
        this.hasCache = FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_CACHE") && !!props.cache;
        this.staticCache = FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_STATIC") && !!props.staticCache;

        this.bGuidPageKey = !(props.key && typeof props.key === "string");
        this.sPageKeyStatic = this.sPageKey = props.key && typeof props.key === "string" ? props.key : guid();

        if (this.sId) {
            this.fetchRemote = this.fetchRemoteStatic ? `${this.fetchRemoteStatic}/${this.sId}` : this.fetchRemote;
            this.sPageKey = !this.bGuidPageKey ? `${this.sPageKeyStatic}_${this.sId}` : this.sPageKey;
        }

        this.isLoaded = false;
        this.hasError = false;
    }

    public setSId(sId: string): void {
        if (this.sId === sId) {
            return;
        }

        this.sId = sId;

        this.fetchRemote = this.fetchRemoteStatic ? `${this.fetchRemoteStatic}/${this.sId}` : this.fetchRemote;
        this.sPageKey = !this.bGuidPageKey ? `${this.sPageKey}_${this.sId}` : this.sPageKey;
    }

    public setDataInvalid(state: DynamicInvalidTargetState = DynamicInvalidTargetState.Reload): void {
        this.isLoaded = false;
        this.hasError = state === DynamicInvalidTargetState.Failed;

        this.forceUpdate();

        if (!this.hasError) {
            this.loadData();
        }
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

    protected initPage(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected loadDataSuccess(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected loadDataFailed(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected componmentMounted(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected componmentWillUnmounted(): void {
        // Todo: Here is nothing to do
        // realize it in sub-class
    }

    protected renderError(): React.ReactNode {
        const reqErrorPage = new RequestError(this.props);
        reqErrorPage.setRetry(this.onErrorRetry.bind(this));

        return reqErrorPage.render();
    }

    public componentDidMount(): void {
        const config = ConfigureController.generateConfigure();
        config.addTrigger("Request_Waiting_Timeout_Cancel", this.onWaitingCancel.bind(this));

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

    public componentWillUnmount(): void {
        const config = ConfigureController.generateConfigure();
        config.removeTrigger("Request_Waiting_Timeout_Cancel");

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

    private async loadData(): Promise<void> {
        try {
            if (this.fetchRemote) {
                const response = await fetch(this.fetchRemote);
                if (this.fetchText) {
                    this.oReceive = await response.text();
                } else {
                    this.oReceive = await response.json();
                }
            }

            if (this.loadDataSuccess && this.loadDataSuccess instanceof Function) {
                this.loadDataSuccess();
            }

            const config = ConfigureController.generateConfigure();
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
            const config = ConfigureController.generateConfigure();
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
        const config = ConfigureController.generateConfigure();
        const storage = config.getStorage();

        storage.updateStamp(this.sPageKey);
    }

    private onWaitingCancel(): void {
        this.hasError = true;
        this.isLoaded = false;

        this.forceUpdate();
    }
}
