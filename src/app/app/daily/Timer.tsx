/**@format */

import React from "react";
import ReactDOM from "react-dom/client";
import { WaitingDialog } from "tianyu-shell/ui/native/widget/WaitingDialog";
import { TianyuShellNotInitialException } from "ts-core/ExceptionBase";
import { FetchFileLoader } from "ts-core/FileLoader";
import { require_msgbundle } from "ts-core/I18n";
import { TIANYU_SHELL_UI_MAJOR_ID } from "ts-core/UI";
import { isMobile } from "ts-core/RuntimeHelper";
import { URL } from "ts-core/URL";

import "./timer.css";

const baseRemoteURL = "/remote-daily/aitianyu/cn/app/daily/timer/countDown";

const messageBundle = require_msgbundle("daily", "app");

document.title = messageBundle.getText("DAILY_TIMER_TITLE");
const rootNode = document.getElementById(TIANYU_SHELL_UI_MAJOR_ID);

function onInitFailed(): void {
    //
}

class Timer extends React.Component<IReactProperty, IReactState> {
    private time: string;
    private timer: number;
    private neg: boolean;

    public constructor(props: IReactProperty) {
        super(props);

        this.time = props["date"].toString() || "";
        this.timer = -1;

        const [count, neg] = Timer.calculateCount(this.time);
        this.neg = neg;
        this.state = { count: count };
    }

    public componentDidMount(): void {
        if (this.time) {
            this.timer = window.setInterval(this._updateTime.bind(this), 0);
        }
    }

    public componentWillUnmount(): void {
        if (this.timer !== -1) {
            window.clearInterval(this.timer);
        }
    }

    public render(): React.ReactNode {
        return <div className={isMobile ? "daily_timer_mob " : "daily_timer"}>{this.renderInternal()}</div>;
    }

    private renderInternal(): React.ReactNode {
        if (!this.time) {
            return this.renderInvalid();
        }

        const [day, hour, min, sec, milisec] = Timer.calculateTimes(Number(this.state["count"]));
        const preText = this.neg ? messageBundle.getText("DAILY_TIMER_PASS") : messageBundle.getText("DAILY_TIMER_AHEAD");
        const hourString = hour > 9 ? hour.toString() : `0${hour}`;
        const minString = min > 9 ? min.toString() : `0${min}`;
        const secString = sec > 9 ? sec.toString() : `0${sec}`;
        const milisecString = milisec > 99 ? milisec.toString() : milisec > 9 ? `0${milisec}` : `00${milisec}`;
        const formatted = `${preText} ${day}:${hourString}:${minString}:${secString}.${milisecString}`;
        return <div className="daily_timer_text">{formatted}</div>;
    }

    private renderInvalid(): React.ReactNode {
        return <div className="daily_timer_text">{messageBundle.getText("DAILY_TIMER_INVALID")}</div>;
    }

    private _updateTime(): void {
        const [count, neg] = Timer.calculateCount(this.time);
        this.neg = neg;
        this.setState({ count: count });
    }

    private static calculateCount(date: string): [number, boolean] {
        if (!date) {
            return [0, false];
        }

        try {
            const target = new Date(date);
            const current = new Date();
            const span = target.getTime() - current.getTime();
            return [Math.abs(span), span < 0];
        } catch {
            return [0, false];
        }
    }

    private static calculateTimes(count: number): [number, number, number, number, number] {
        const milisec = count % 1000;
        const sec = Math.trunc((count / 1000) % 60);
        const min = Math.trunc((count / 60000) % 60);
        const hour = Math.trunc((count / 3600000) % 24);
        const day = Math.trunc(count / 3600000 / 24);

        return [day, hour, min, sec, milisec];
    }
}

async function httpGetTime(): Promise<string> {
    const url = `${baseRemoteURL}${window.location.search}`;
    const loader = new FetchFileLoader(url);
    try {
        const response = await loader.openAsync();
        const date = response["response"];
        if (!date || typeof date !== "string" || date === "0000-00-00 00:00:00.000") {
            return "";
        }

        return date;
    } catch (_e) {
        return "";
    }
}

async function loadTimer(): Promise<string> {
    return await httpGetTime();
}

async function onPageLoading(): Promise<void> {
    const time = await loadTimer();
    if (rootNode) {
        const root = ReactDOM.createRoot(rootNode);
        root.render(<Timer date={time} />);
    } else {
        throw new TianyuShellNotInitialException("tianyu shell major page is not ready");
    }
}

WaitingDialog.withDialog(onPageLoading, messageBundle.getText("DAILY_INITIAL_LOADING_WAIT_TEXT"));
