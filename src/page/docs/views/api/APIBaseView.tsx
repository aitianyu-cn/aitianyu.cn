/**@format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { DocsViewsBase } from "../BaseView";

import "./api.base.view.css";

export enum APIInternalType {
    Function,
    Function_T,
    Class,
    Class_A,
    Class_T,
    Delegate,
    Enum,
    Interface,
    Interface_T,
    Struct,
    Struct_T,
    Value,
    Macro,
}

export enum APIVisibleType {
    Public,
    Protected,
    Private,
    Internal,
}

export enum APIReturnType {
    Value,
    Pointer,
    Reference,
    PTRRef,
}

export interface IAPITransmition {
    return: string;
    retType: APIReturnType;
}

export interface IAPIProp {
    name: string;
    raw: string;
    visible: APIVisibleType;
}

export interface IAPISource {
    name: string;
    raw: string;
    type: APIInternalType;
    file: string;
    notes: string[];
    props: IAPIProp[];
    methods: IAPIProp[];
}

export interface IAPIPackage {
    [namespace: string]: IAPISource[];
}

export class DocsAPIViewsBase extends DocsViewsBase {
    protected oSource: IAPIPackage;

    public constructor(source?: IAPIPackage) {
        super({});

        this.oSource = source ?? {};
    }

    public render(): React.ReactNode {
        return <div className="docs_api_base_view_baseGrid">base view</div>;
    }
}
