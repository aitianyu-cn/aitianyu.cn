/**@format */

import { ShellUIElement } from "tianyu-shell/ShellUIElement";
import { guid } from "ts-core/Guid";
import { isMobile } from "ts-core/RuntimeHelper";

import "./css/horizontal.css";
import { INavigationOption } from "./Types";

function _default_size_change() {}

function _get_events_id(id: string): string {
    return `HorizontalNavigation_${id}`;
}

export class HorizontalNavigation extends ShellUIElement {
    private id: string;
    private isMobOrNarrow: boolean;

    private options: INavigationOption;

    public constructor(options?: INavigationOption) {
        super();

        this.options = options || {
            autosize: false,
            sizeChanged: _default_size_change,
        };

        this.id = guid();
        this.isMobOrNarrow = isMobile() || HorizontalNavigation.isNarrow();

        this.registerEvents(this.id);
    }

    public getKey(): string {
        return this.id;
    }

    public destroy(): void {
        this.unregisterEvents(this.id);
    }

    public override render(): HTMLElement {
        this.isMobOrNarrow = isMobile() || HorizontalNavigation.isNarrow();
        if (this.isMobOrNarrow) {
            return this.renderForNormal();
        } else {
            return this.renderForMob_Narrow();
        }
    }

    private renderForNormal(): HTMLElement {
        const navigationBase = document.createElement("div");
        navigationBase.classList.add("nav_h_d_b");

        return navigationBase;
    }

    private renderForMob_Narrow(): HTMLElement {
        const navigationBase = document.createElement("div");
        navigationBase.classList.add("nav_h_d_b");

        return navigationBase;
    }

    private registerEvents(id: string): void {
        const eventId = _get_events_id(id);
    }

    private unregisterEvents(id: string): void {
        const eventId = _get_events_id(id);
    }

    private onresize(ev: UIEvent): void {
        //
    }

    private static isNarrow(): boolean {
        return false;
    }
}
