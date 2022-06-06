/**@format */

import React from "react";
import { Configure } from "src/dty/core/Configure";
import { IShellProperty, IShellState } from "src/dty/model/IShell";
import { Application } from "../application/Application";
import { Dialog } from "../dialog/Dialog";
import { HorizontalNavigation } from "../navigation/HorizontalNavigation";
import { InitialSource } from "./res/initialSource";

import "./main.css";
import { isMobile } from "react-device-detect";

export class HomePage extends React.Component<IShellProperty, IShellState> {
    private isInited: boolean;
    private isInitError: boolean;

    private aInitItems: string[];
    private totalInitCount: number;
    private initedCount: number;

    public constructor(props: IShellProperty) {
        super(props);

        this.isInited = false;
        this.isInitError = false;

        this.aInitItems = Object.keys(InitialSource);
        this.totalInitCount = this.aInitItems.length;
        this.initedCount = 0;
    }

    public componentDidMount(): void {
        if (!this.isInited) {
            this.initData();
        }
    }

    public componentWillUnmount(): void {
        if (this.isInited && !this.isInitError) {
            const config = Configure.generateConfigure();
            const watchDog = config.getStorageDog();

            watchDog.endWatchDog();
        }
    }

    public render(): React.ReactNode {
        if (this.isInited && !this.isInitError) {
            return this.renderInited();
        }

        if (this.isInitError) {
            return this.renderError();
        }

        return this.renderIniting();
    }

    private renderIniting(): React.ReactNode {
        const initedPercentage = Number((this.initedCount / this.totalInitCount) * 100).toFixed(0);
        const initedPercentageString = `${initedPercentage}%`;

        return (
            <div className="global_home_page_initing">
                <div className="global_home_page_initing_base">
                    <div className="global_home_page_initing_processing_percentage">{initedPercentageString}</div>
                    <div className="global_home_page_initing_processing_bar_base">
                        <div className="global_home_page_initing_processing_bar" style={{ width: initedPercentageString }}></div>
                    </div>
                </div>
            </div>
        );
    }

    private renderError(): React.ReactNode {
        return (
            <div className="global_home_page_initing">
                <div className="global_home_page_initing_base">
                    <img
                        className={isMobile ? "global_home_page_error_img_mob" : "global_home_page_error_img"}
                        src="assert/anim/error.gif"
                        alt={"HOME_PAGE_ERROR_IMG_ALT"}
                    />
                    <div className="global_home_page_initing_error_desc">当前页面无法加载，请稍后再试</div>
                    <div className="global_home_page_initing_error_desc">
                        The current page cannot load, please try again later
                    </div>
                </div>
            </div>
        );
    }

    private renderInited(): React.ReactNode {
        this.initDone();

        return (
            <div id="global_home_page" className="home_page_def_homePage">
                <Dialog />
                <div className="home_page_def_navigationBar">
                    <HorizontalNavigation />
                </div>
                <div className="home_page_def_contentMain">
                    <div className="home_page_def_appContentForward"></div>
                    <div className="home_page_def_appContent">
                        <Application />
                    </div>
                </div>
            </div>
        );
    }

    private initDone(): void {
        const config = Configure.generateConfigure();
        const watchDog = config.getStorageDog();

        watchDog.startWatchDog();
    }

    private async initData(): Promise<void> {
        for (const initItemName of this.aInitItems) {
            try {
                const initItemInvoker = InitialSource[initItemName].invoker;
                await initItemInvoker();
            } catch {
                this.isInitError = true;
            }

            this.initedCount += 1;
            this.isInited = this.initedCount === this.totalInitCount;

            this.forceUpdate();

            if (this.isInitError) {
                break;
            }
        }
    }
}
