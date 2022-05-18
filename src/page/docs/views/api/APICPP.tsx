/**@format */

import React from "react";
import { DocsAPIViewsBase } from "./APIBaseView";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const oAPICppSource = require("./cpp/namespace.json");

export class DocsAPICPP extends DocsAPIViewsBase {
    public constructor() {
        super();
    }

    // public render(): React.ReactNode {
    //     return <div>CPP</div>;
    // }
}
