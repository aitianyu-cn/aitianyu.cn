/**@format */

export interface IDailyBase {
    author: string;
    key: string;
}

export interface ITimerRecord extends IDailyBase {
    time: string;
    summary: string;
    description: string;
}

export interface ITimerGet extends IDailyBase {
    time: string;
    summary: string;
}

export interface ITimerGetRecord {
    time: string;
    during: number;
    summary: string;
    description: string;
}

export interface ICountDownTime {
    year: string;
    month: string;
    day: string;
    hour: string;
    min: string;
    sec: string;
    milisec: string;
    formatted: string;
}
