/**@format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { DownLoad } from "../../page/download/Download";
import { Home } from "../../page/Home/Home";
import { Language } from "../../page/language/Language";
import { Project } from "../../page/project/Project";
import { Error } from "../../page/error/Error";

import "./css/main.css";
import { Search } from "../../page/search/Search";

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
                    <Route path="search" element={<Search />} />

                    <Route path="/error" element={<Error />}>
                        <Route path="/error/404" element={<Error />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/error/404" replace />} />
                </Routes>
            </div>
        );
    }
}
