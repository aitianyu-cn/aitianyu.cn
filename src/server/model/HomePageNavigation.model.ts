/**@format */

export interface IHomeNavigationParam {
    text: string;
    id: string;
}

export interface IHomeNavigation {
    page: string;
    text: string;
    direct: string;
    desc: string;

    paramType: string;
    params: IHomeNavigationParam[];
}
