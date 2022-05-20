/**@format */

export interface IListenerList {
    [listener: string]: {
        available: boolean;
        description?: string;
    };
}

export const AreaListener: IListenerList = {
    MessageBundle_Area_Listener: {
        available: true,
        description: "Listen Area is changed and to reload the message source",
    },
};

export const TriggerList: IListenerList = {
    Horizontal_Navigation_Listener: {
        available: true,
        description: "Listen View is changed and to switch the navigation item",
    },
    Message_Dialog_Open: {
        available: true,
        description: "To open the global message dialog",
    },
    Message_Dialog_Close: {
        available: true,
        description: "To close the global message dialog",
    },
};
