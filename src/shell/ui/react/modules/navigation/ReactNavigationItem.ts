/**@format */

import { ReactModule } from "../ReactModuleBase";

import "./css/navigation-item.css";

export class ReactNavigationItem extends ReactModule {
    protected key: string;
    protected icon: string;
    protected select: boolean;

    public constructor(props?: IReactProperty) {
        super(props);

        this.key = props?.["key"].toString() || "";
        this.icon = props?.["icon"].toString() || "";
        this.select = !!props?.["selected"];
    }

    public setSelect(): void {
        if (this.select) return;

        this.select = true;
        this.forceUpdate();
    }

    public setUnselect(): void {
        if (!this.select) return;

        this.select = false;
        this.forceUpdate();
    }

    public getSelection(): boolean {
        return this.select;
    }

    public getKey(): string {
        return this.key;
    }

    public getIcon(): string {
        return this.icon;
    }
}
