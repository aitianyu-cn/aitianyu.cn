/**@format */

import React from "react";
import { Footer } from "../../app/footer/Footer";

import "./css/mob.css";

export function mobileHome(): React.ReactNode {
    const aNodes: React.ReactNode[] = [];
    for (let i = 0; i < 5; ++i) aNodes.push(<h1 key={i}>1234567890</h1>);

    return (
        <div className="baseGrid">
            <div className="content"></div>
            {/* <div className="content">{aNodes}</div> */}
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}
