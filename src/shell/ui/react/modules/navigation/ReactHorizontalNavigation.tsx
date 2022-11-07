/**@format */

import React from "react";
import { ReactNode } from "react";
import { ReactNavigation } from "./ReactNavigation";

import "./css/horizontal-navigation.css";
import { routerUrl2Id } from "tianyu-shell/common/utilities/RouterHelper";
import { ReactHorizontalNavigationItem } from "./ReactHorizontalNavigationItem";
import { ReactNavigationItem } from "./ReactNavigationItem";

export class ReactHorizontalNavigation extends ReactNavigation {
    private fontsizeMap: Record<number, number>;
    private fontSize: number;

    public constructor(props?: IReactProperty) {
        super(props);

        this.fontsizeMap = {
            [0]: ReactNavigation.FONT_SIZE_DEFAULT,
        };
        this.fontSize = ReactNavigation.FONT_SIZE_DEFAULT;
    }

    /**
     *
     * @param map
     */
    public setWidthToFontSizeMap(map: Record<number, number>): void {
        if (Object.keys(map).length <= 0) {
            return;
        }

        this.fontsizeMap = map;
    }

    // ##########################################################################
    // basic override
    // ##########################################################################

    protected override isNarrow(): boolean {
        const pageWidth = window.innerWidth;

        let memberWidth = 0;
        for (const item of Object.keys(this.items)) {
            const itemObj = this.items[item];
            memberWidth += itemObj.calculateWidth();
        }

        return memberWidth > pageWidth;
    }

    protected override isSizeChanged(): boolean {
        const newPageWidth = window.innerWidth;
        return newPageWidth !== this.currentPageWidth;
    }

    protected override onResize(): boolean {
        const newWidth = window.innerWidth;
        // store the old size ans calculate the new size
        const oldFontsize = this.fontSize;
        this.fontSize = this.calculateFontsizeFromWidth(newWidth);
        const isFontSizeChanged = oldFontsize !== this.fontSize;

        let requireWidth = 0;
        for (const item of Object.keys(this.items)) {
            const itemObj = this.items[item];

            // only when the font size is changed, to update font size
            isFontSizeChanged && itemObj.updateFontSize(this.fontSize);

            // to recalculate the width
            requireWidth += itemObj.calculateWidth();
        }

        // get whether really need to update layout
        // case 1: when in narrow mode and the newest width is greate than all items width => needs to switch to no-narrow mode.
        // case 2: when not in narrow mode and the newest width is less than all items width => needs to switch to narrow mode.
        let isNeedRedraw = (this.inNarrowMode && requireWidth <= newWidth) || (!this.inNarrowMode && requireWidth > newWidth);

        // only when the layout does not need to redraw and the font size is changed, to update the css style to apply the new font size.
        if (!isNeedRedraw && isFontSizeChanged) {
            const navigation = document.getElementById(this.id);
            if (navigation) {
                navigation.style.fontSize = `${this.fontSize}px`;
            } else {
                // if the navigation element can not be gotten, to enforce redraw to ensure the layout is correct.
                isNeedRedraw = true;
            }
        }

        return isNeedRedraw;
    }

    protected override updateItems(): void {
        const source = this.itemSource;
        const newWidth = window.innerWidth;
        this.fontSize = this.calculateFontsizeFromWidth(newWidth);

        for (const sourceKey of Object.keys(source)) {
            const sourceItem = source[sourceKey];
            const itemId = routerUrl2Id(sourceKey.startsWith("/") ? sourceKey.substring(1) : sourceKey);

            const itemInstance = new ReactHorizontalNavigationItem({
                id: itemId,
                key: sourceItem.key,
                icon: sourceItem.icon,
                fontSize: this.fontSize,
                assist: sourceItem.assist,
            });
            this.items[sourceKey] = itemInstance;
        }
    }

    // ##########################################################################
    // navigation render part
    // ##########################################################################

    protected override renderForMobile(): ReactNode {
        return <div></div>;
    }

    // render for not mobile part

    private renderTitle(): ReactNode {
        return <div className="r_hn_t">{this.title}</div>;
    }

    // // render for normal part
    protected override renderForNormal(): ReactNode {
        const normalItems: ReactNavigationItem[] = [];
        const assistItems: ReactNavigationItem[] = [];
        this.navigationItemsClassification({ normalItems: normalItems, assistItems: assistItems });

        return (
            <div id={this.id} className="r_hn_b">
                <div className="r_hn_c">
                    {this.title && this.renderTitle()}
                    <div className="r_hn_n_n">{this.renderNormalItemsForNormalMode(normalItems)}</div>
                    <div className="r_hn_as_n">{this.renderAssistItemsForNormalMode(assistItems)}</div>
                </div>
            </div>
        );
    }

    private renderNormalItemsForNormalMode(normalItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of normalItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_n_in_n">{renderedItems}</div>;
    }
    private renderAssistItemsForNormalMode(assistItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of assistItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_as_in_n">{renderedItems}</div>;
    }

    // // render for narrow part
    protected override renderForNarrow(): ReactNode {
        return <div></div>;
    }

    private renderNormalItemsForNarrowMode(normalItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of normalItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_n_in_n">{renderedItems}</div>;
    }
    private renderAssistItemsForNarrowMode(assistItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of assistItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_as_in_n">{renderedItems}</div>;
    }

    // ##########################################################################
    // prepare data for render
    // ##########################################################################

    private calculateFontsizeFromWidth(width: number): number {
        let fontSize: number = 0;
        let relatedWidth: number = width;

        let minFontsizeOfWidth: number = 0;
        let minSetWidth: number = width;
        for (const setWidth of Object.keys(this.fontsizeMap)) {
            const setWidthNum: number = Number.parseInt(setWidth);

            // calculate the actual diff between current width and mapped width.
            const nearWidth = width - setWidthNum;
            // if mapped width is less than actual and the diff is less or equal to the pre-calculated.
            if (nearWidth > 0 && relatedWidth > nearWidth) {
                // to update the font size to the closer one.
                relatedWidth = nearWidth;
                fontSize = this.fontsizeMap[setWidthNum];
            }

            // to cache the minimum mapped width
            if (minSetWidth > setWidthNum) {
                minSetWidth = setWidthNum;
                minFontsizeOfWidth = this.fontsizeMap[setWidthNum];
            }
        }

        // return font size if it is mapped
        // or return the minimum size in the mapped if all the size is greate than mapping
        // or return default size if all of these are not mapped
        return fontSize || minFontsizeOfWidth || ReactNavigation.FONT_SIZE_DEFAULT;
    }

    private navigationItemsClassification(targets: {
        normalItems: ReactNavigationItem[];
        assistItems: ReactNavigationItem[];
    }): void {
        const fnFillArray = (item: ReactNavigationItem, arr: ReactNavigationItem[]) => {
            if (item.getIndex() === -1) {
                arr.push(item);
                return arr;
            } else {
                const newArr: ReactNavigationItem[] = [];
                let i = 0;
                for (; i < arr.length && arr[i].getIndex() !== -1; ++i) {
                    if (arr[i].getIndex() > item.getIndex()) {
                        break;
                    } else {
                        newArr.push(arr[i]);
                    }
                }
                arr.push(item);
                for (; i < arr.length; ++i) {
                    newArr.push(arr[i]);
                }

                return newArr;
            }
        };

        for (const itemKey of Object.keys(this.items)) {
            const item = this.items[itemKey];
            if (item.getAssist()) {
                targets.assistItems = fnFillArray(item, targets.assistItems);
            } else {
                targets.normalItems = fnFillArray(item, targets.normalItems);
            }
        }
    }
}
