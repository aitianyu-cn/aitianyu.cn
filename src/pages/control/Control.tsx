/**@format */

import React from "react";
import { checkLogin } from "src/dty/ManagerHelper";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";

export class Control extends TYViewComponent {
    public render(): React.ReactNode {
        if (!checkLogin()) {
            return this.renderNotLogged();
        }

        return <div>Control</div>;
    }

    private renderNotLogged(): React.ReactNode {
        return <h1>请登录</h1>;
    }
}
