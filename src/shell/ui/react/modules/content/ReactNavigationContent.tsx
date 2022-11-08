/**@format */

import React from "react";
import { getHashMappedItem } from "../../core/HashHelper";
import { IReactContentProperty } from "./Interface";

const REACT_NAVIGATION_CONTENT_ONHASHCHANGED_LISTENER: string = "react-navigation-content-onhashChanged-listener";

export class ReactNavigationContent extends React.Component<IReactContentProperty, IReactState> {
    private isLoaded: boolean;

    private currentHash: string;
    private inFallback: boolean;

    public constructor(props: IReactContentProperty) {
        super(props);

        this.isLoaded = false;

        const matchedItem = getHashMappedItem(this.props.router, this.props.default);
        this.inFallback = !!!matchedItem.value;
        this.currentHash = matchedItem.key;
    }

    public override componentDidMount(): void {
        this.isLoaded = true;

        tianyuShell.core.event.onhashChanged.listen(
            REACT_NAVIGATION_CONTENT_ONHASHCHANGED_LISTENER,
            this.onHashChanged.bind(this),
        );
    }

    public override componentWillUnmount(): void {
        this.isLoaded = false;

        tianyuShell.core.event.onhashChanged.removeListen(REACT_NAVIGATION_CONTENT_ONHASHCHANGED_LISTENER);
    }

    public override forceUpdate(callback?: (() => void) | undefined): void {
        if (!this.isLoaded) {
            return;
        }

        super.forceUpdate(callback);
    }

    public override render(): React.ReactNode {
        return <div style={this.props.style}>{this.renderComponent()}</div>;
    }

    private renderComponent(): React.ReactNode {
        if (this.inFallback) {
            return <this.props.fallback.component {...this.props.fallback.paramGenerater} />;
        }

        const componentItem = this.props.router[this.currentHash];
        if (!!!componentItem) {
            return <this.props.fallback.component {...this.props.fallback.paramGenerater} />;
        }

        return <componentItem.component {...componentItem.paramGenerater} />;
    }

    private onHashChanged(): void {
        const matchedItem = getHashMappedItem(this.props.router, this.props.default);

        // cases:
        // 1. if the fallback state is changed - should always re-render
        // 2. if the fallback state is true and fallback does force update - should always re-render
        // 3. if the fallback state is false - to check the selection
        const fallbackChanged = this.inFallback !== !!!matchedItem.value || (this.inFallback && this.props.fallback.forceUpdate);
        // cases:
        // 1. if the fallback is changed - should re-render
        // 2. if the fallback is not changed and not in the fallback mode, the hash mapped is changed - should re-render
        // 3. if the fallback is not changed and not in the fallback mode, the hash mapped is not changed,
        //    to check the force update state:
        //      - force update is true : re-render
        //      - force update is false: ignore render
        const isSelectionChanged =
            fallbackChanged || (!!matchedItem.value && (this.currentHash !== matchedItem.key || matchedItem.value.forceUpdate));
        if (isSelectionChanged) {
            this.inFallback = !!!matchedItem.value;
            this.currentHash = matchedItem.key;
            this.forceUpdate();
        }
    }
}
