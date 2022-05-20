/**@format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IShellProperty } from "src/dty/model/IShell";
import { Home } from "src/pages/home/Home";
import { Error } from "src/pages/error/Error";
import { Language } from "src/pages/language/Language";
import { DownLoad } from "src/pages/download/Download";

import "./css/main.css";
import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { DocsHome } from "src/pages/docs/DocsHome";
import { DocsAPI } from "src/pages/docs/DocsAPI";
import { DocsAPIProject } from "src/pages/docs/DocsAPIProject";

export class Application extends TYViewComponent {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="application_main_def_main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/download" element={<DownLoad />} />

                    <Route path="/docs" element={<DocsHome />} />
                    <Route path="/docs/api" element={<DocsAPI />} />
                    <Route path="/docs/api/*" element={<DocsAPIProject />} />

                    <Route path="/language" element={<Language />} />
                    {/* <Route path="/search" element={<Search />} /> */}

                    <Route path="/error" element={<Error />}>
                        <Route path="/error/404" element={<Error />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/error/404" replace />} />
                </Routes>
            </div>
        );
    }
}
