/**@format */

export enum Operation {
    Add = 1,
    Delete = 2,
    Get = 4,
    Post = 8,
    Vote = 16,
    Release = 32,
    ResponseChange = 64,
    CreateClone = 128,
    DestroyClone = 256,
}

export enum ResponseType {
    Add,
    Delete,
    Modify,
    AbsModify,
    Query,
    Create, // 只用于分身操作
    Destroy, // 只用于分身操作
}

export interface IResponse {
    type: ResponseType;
    source: "Current" | "InChild" | "InClone";
}
