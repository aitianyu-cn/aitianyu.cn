/**@format */

interface IReactProperty {
    [key: string]: string | boolean | number;
}

interface IReactState {
    [key: string]: string | boolean | number;
}

interface IReactControlProperty {
    style?: StandardLonghandProperties;
    width?: number;
}
