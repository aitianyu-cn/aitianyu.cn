/**@format */

export interface IJsonHTMLButton {
    id: string;
    content: string;
    class: string;
    clickTrigger: string;
    clickEvent: string;
}

export interface IJsonHTMLViewChild {
    id: string;
    class: string;
    type: string;
    children?: (IJsonHTMLViewChild | IJsonHTMLButton)[];
}

export interface IJsonHTMLView {
    id: string;
    class: string;
    type: string;
    children: (IJsonHTMLViewChild | IJsonHTMLButton)[];
}

export interface IJsonHTML {
    hasButton?: string;
    buttons?: IJsonHTMLButton[];
    view: IJsonHTMLView;
}
