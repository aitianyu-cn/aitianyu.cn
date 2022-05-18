/**@format */
/* eslint-disable react/react-in-jsx-scope */

import { Link } from "react-router-dom";
import { getSearchParameterObj, IParameters } from "../../dty/common/RouteHelp";
import { PageBase } from "../common/PageBase";

import "./css/docs.main.css";
import { addSearch } from "./DocsPageHelper";
import { MsgBundle } from "./MsgBundle";

interface ISourceItem {
    key: string;
    name: string;
    hash: string;
}

export class DocsHome extends PageBase {
    private msgBundle: MsgBundle;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private oSource: any;

    public constructor() {
        super({});

        this.msgBundle = new MsgBundle();
        this.oSource = require("./res/source.json");
    }

    public render(): React.ReactNode {
        // let renderPage: React.ReactNode | null = null;

        // const searchObject = getSearchParameterObj();
        // if (searchObject["docs"]) {
        //     renderPage = this.renderHashPage(searchObject);
        // }

        return <div className="docs_baseGrid">{this.renderNormal()}</div>;
        // return this.renderNormal();
    }

    private renderHashPage(oSearch: IParameters): React.ReactNode {
        return <div className="docs_baseGrid">hash page {oSearch["docs"]}</div>;
    }

    private renderNormal(): React.ReactNode {
        return <div className="docs_content">{this.renderSourceItem()}</div>;
    }

    private renderSourceItem(): React.ReactNode[] {
        const aItemSources = this.getSources();
        if (aItemSources.length === 0) {
            return [];
        }

        if (aItemSources.length === 1) {
            const item = aItemSources[0];
            return [
                <div key={item.key} className="docs_item_single">
                    <Link to={`/docs/${item.hash}`} className="docs_item_single_inner">
                        {item.name}
                        {/* <div className="docs_item_inner_text">{item.name}</div> */}
                    </Link>
                </div>,
            ];
        }

        return [];
    }

    private getSources(): ISourceItem[] {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const aSourceList = this.oSource["docs"];
        if (!aSourceList || !Array.isArray(aSourceList) || aSourceList.length === 0) {
            return [];
        }

        const aItems: ISourceItem[] = [];
        for (const item of aSourceList) {
            const sName = item["name"];
            const sHash = item["hash"];

            if (!sName || !sHash) {
                continue;
            }

            let convertName = (sName as string) || "";
            const i18nMatch = convertName.match(/I18N=/);
            if (i18nMatch) {
                const subString = convertName.substring(5);
                convertName = this.msgBundle.getI18nText(subString);
            }

            aItems.push({
                key: sName,
                name: convertName,
                hash: sHash,
            });
        }

        return aItems;
    }
}
