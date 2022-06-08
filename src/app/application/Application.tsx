/**@format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IShellProperty } from "src/dty/model/IShell";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { Control } from "src/pages/control/Control";
import { Error } from "src/pages/error/Error";
import { User } from "src/pages/user/User";

import "./css/main.css";

export class Application extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="application_main_def_main">
                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/control" element={<Control />} />
                    <Route path="/user" element={<User />} />

                    <Route path="/error" element={<Error />}>
                        <Route path="/error/404" element={<Error />} />
                        <Route path="/error/603" element={<Error />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/error/404" replace />} />
                </Routes>
            </div>
        );
    }
}
