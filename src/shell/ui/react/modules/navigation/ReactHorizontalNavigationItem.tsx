/**@format */

import React from "react";
import { ReactNode } from "react";
import { ReactNavigationItem } from "./ReactNavigationItem";

import "./css/horizontal-navigation-item.css";

export class ReactHorizontalNavigationItem extends ReactNavigationItem {
    public constructor(props?: IReactProperty) {
        super(props);
    }

    public override renderForNarrow(): ReactNode {
        const classListOfText: string[] = ["r_hni_t"];
        classListOfText.push(this.assist ? "r_hni_t_a" : "r_hni_t_n");

        return (
            <div
                className={`r_hni_b ${this.select ? "r_hni_b_s" : "r_hni_b_us"}`}
                key={this.id}
                onClick={this.onClick.bind(this)}>
                <img className="r_hni_i" src={this.icon} alt={this.key} />
                <div className={classListOfText.join(" ")}>{this.key}</div>
            </div>
        );
    }
}
