/**@format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { DownLoad } from "../../page/download/Download";
import { Home } from "../../page/Home/Home";
import { Language } from "../../page/language/Language";
import { Project } from "../../page/project/Project";
import { Error } from "../../page/error/Error";

import "./css/main.css";

export class Application extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="application_main_def_main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="download" element={<DownLoad />} />
                    <Route path="project" element={<Project />} />
                    <Route path="language" element={<Language />} />
                    <Route path="/*" element={<Error />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
        );
    }
}
