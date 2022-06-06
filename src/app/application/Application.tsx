/**@format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IShellProperty } from "src/dty/model/IShell";
import { Home } from "src/pages/home/Home";
import { Error } from "src/pages/error/Error";
import { Language } from "src/pages/language/Language";
import { DownLoad } from "src/pages/download/Download";

import { TYViewComponent } from "src/dty/shell/TYViewComponent";
import { Docs } from "src/pages/docs/Docs";
import { APIDocs } from "src/pages/docs/APIDocs";
import { ArchitectureDocs } from "src/pages/docs/ArchitectureDocs";
import { HelpDocs } from "src/pages/docs/HelpDocs";
import { MacroDefineDocs } from "src/pages/docs/MacroDefineDocs";

import "./css/main.css";

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

                    <Route path="/docs" element={<Docs />} />
                    <Route path="/docs/api" element={<APIDocs />} />
                    <Route path="/docs/api/*" element={<APIDocs />} />
                    <Route path="/docs/arch" element={<ArchitectureDocs />} />
                    <Route path="/docs/arch/*" element={<ArchitectureDocs />} />
                    <Route path="/docs/help" element={<HelpDocs />} />
                    <Route path="/docs/help/*" element={<HelpDocs />} />
                    <Route path="/docs/macro" element={<MacroDefineDocs />} />
                    <Route path="/docs/macro/*" element={<MacroDefineDocs />} />

                    <Route path="/language" element={<Language />} />
                    {/* <Route path="/search" element={<Search />} /> */}

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
