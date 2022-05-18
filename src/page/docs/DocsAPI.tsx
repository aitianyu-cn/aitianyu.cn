/**@format */
/* eslint-disable react/react-in-jsx-scope */

import { PageBase } from "../common/PageBase";

import "./css/docs.main.css";
import "./css/docs.api.css";
import { MsgBundle } from "./MsgBundle";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

export class DocsAPI extends PageBase {
    private msgBundle: MsgBundle;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private oAPIBase: any;

    public constructor() {
        super({});

        this.msgBundle = new MsgBundle();
        this.oAPIBase = require("./res/apibase.json");

        document.title = this.msgBundle.getI18nText("PROJECT_DOCS_API_TITLE");
    }

    public componentDidMount(): void {
        window.onhashchange = this.onhashChanged.bind(this);
    }

    public render(): React.ReactNode {
        const aAPILangs = this.oAPIBase["sourceLang"];
        const showTitle = Array.isArray(aAPILangs) && aAPILangs.length !== 0;

        return (
            <div className="docs_api_baseGrid">
                <div className="docs_api_title_base">{showTitle && this.renderAPIExplorer()}</div>
                {this.renderLanguageSelector(aAPILangs, showTitle)}
            </div>
        );
    }

    private renderAPIExplorer(): React.ReactNode {
        return <div className="">{this.msgBundle.getI18nText("TIANYU_DEV_DOCS_API_TITLE")}</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private renderLanguageSelector(aAPILangs: any, hasValue: boolean): React.ReactNode {
        if (!hasValue) {
            return (
                <div className="docs_api_selector_no_language">
                    {this.msgBundle.getI18nText("TIANYU_DEV_DOCS_API_NOT_AVAILABLE")}
                </div>
            );
        }

        const aAPILanguageItemList: React.ReactNode[] = [];
        for (const apiLang of aAPILangs) {
            const apiLangItem = (
                <Link
                    key={apiLang}
                    className={isMobile ? "docs_api_selector_list_item_mob" : "docs_api_selector_list_item"}
                    to={`/docs/api/${apiLang}`}>
                    {this.msgBundle.getI18nText(apiLang)}
                </Link>
            );

            aAPILanguageItemList.push(apiLangItem);
        }

        return (
            <div className={isMobile ? "docs_api_selector_list_base_mob" : "docs_api_selector_list_base"}>
                {aAPILanguageItemList}
            </div>
        );
    }

    private onhashChanged(): void {
        this.forceUpdate();
    }
}
