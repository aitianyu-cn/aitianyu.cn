/**@format */

import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { IShellProperty } from "../../dty/frame/shell/model/IShellProperty";
import { IShellState } from "../../dty/frame/shell/model/IShellState";
import { DownLoad } from "../../page/download/Download";
import { Home } from "../../page/Home/Home";
import { Language } from "../../page/language/Language";
import { Project } from "../../page/project/Project";

import "./css/main.css";

export class Application extends React.Component<IShellProperty, IShellState> {
    public constructor(props: IShellProperty) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="main">
                <HashRouter>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/home" component={Home} exact />
                        <Route path="/download" component={DownLoad} exact />
                        <Route path="/project" component={Project} exact />
                        <Route path="/language" component={Language} exact />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}
