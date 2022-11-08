/**@format */

import React from "react";
import { ReactNode } from "react";
import { ReactNavigationItem } from "./ReactNavigationItem";

import "./css/horizontal-navigation-item.css";
import { isMobile } from "ts-core/RuntimeHelper";

export class ReactHorizontalNavigationItem extends ReactNavigationItem {
    public constructor(props?: IReactProperty) {
        super(props);
    }

    public override renderForNarrow(): ReactNode {
        const classListOfText: string[] = ["r_hni_t"];
        classListOfText.push(this.assist ? "r_hni_t_a" : "r_hni_t_n");

        const basicStyle: string[] = ["r_hni_b"];
        basicStyle.push(this.select ? (isMobile() ? "r_hni_b_s_m" : "r_hni_b_s") : "r_hni_b_us");

        return (
            <div className={basicStyle.join(" ")} key={this.id} onClick={this.onClick.bind(this)}>
                {typeof this.icon === "string" ? (
                    <img className="r_hni_i" src={this.icon} alt={this.key} />
                ) : (
                    <div className="r_hni_i" dangerouslySetInnerHTML={{ __html: this.icon }}></div>
                )}
                <div className={classListOfText.join(" ")}>{this.key}</div>
            </div>
        );
    }
}
