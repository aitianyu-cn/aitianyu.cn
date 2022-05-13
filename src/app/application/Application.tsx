/**@format */

import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { DownLoad } from "../../page/download/Download";
import { Home } from "../../page/Home/Home";
import { Language } from "../../page/language/Language";
import { Project } from "../../page/project/Project";
import { Error } from "../../page/error/Error";

import "./css/main.css";

const routers = [
    {
        title: "home",
        path: "/",
        component: Home,
    },
    {
        title: "home",
        path: "/home",
        component: Home,
    },
    {
        title: "download",
        path: "/download",
        component: DownLoad,
    },
    {
        title: "project",
        path: "/project",
        component: Project,
    },
    {
        title: "language",
        path: "/language",
        component: Language,
    },
];

export class Application extends React.Component<IShellProperty, IShellState> {
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
                    <Route path="/project" element={<Project />} />
                    <Route path="/language" element={<Language />} />
                    <Route element={<Error />} />

                    {/* <Route path="*" element={<Navigate to="/error" replace />} /> */}
                </Routes>
            </div>
        );
    }
}
