/**@format */

export interface IFeature {
    name: string;
    isActive: boolean;
    depFeature: string[];
    defaultOn: boolean;
}

export interface IFeatureSourceItem {
    description: string;
    defaultOn: boolean;
    version: string;
    reqId: string;
    depFeature: string[];
}

export type FeatureSourceList = Record<string, IFeatureSourceItem>;

export type MapOfBoolean = Record<string, boolean>;
export type MapOfStrings = Record<string, string[]>;
export type MapOfString = Record<string, string>;
export type MapOfType<T> = Record<string, T>;

export type CallbackAction = () => void;
export type CallbackActionT<T> = (value: T) => void;

export type HashChangedCallback = (hash: string, ev?: HashChangeEvent) => void;

export interface IPerfRecorder {
    id: string;
    start: number;
}

export interface ICaptureRecorder {
    index: number;
    finish: CallbackAction;
}

export enum LogLevel {
    DEBUG,
    ERROR,
    FATAL,
    INFO,
    WARNING,
    LOG,
}

export type PerfCaptureCallbackType = "START" | "END";

export type PerfCaptureCallback = (option: PerfCaptureCallbackType, capture: string, time: number) => void;

export enum MessageType {
    DEBUG,
    INFO,
    SUCCESS,
    WARNING,
    ERROR,
    CUSTOM,
}

export interface IMessageOptions {
    id?: string;
    during?: number;
    onClose?: CallbackAction;
    onOpen?: CallbackAction;
}
