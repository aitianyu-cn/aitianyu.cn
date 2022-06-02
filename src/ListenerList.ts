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
    Request_Waiting_Timeout_Dialog_Cancel_Wait: {
        available: true,
        description: "To refresh the view if the waiting time out",
    },
    Request_Waiting_Timeout_Dialog_Continue_Wait: {
        available: true,
        description: "To continue waiting the response if the waiting time out",
    },
    Request_Waiting_Timeout_Cancel: {
        available: true,
        description: "To cancel the response and set to error",
    },
    Docs_Project_Selector_Trigger: {
        available: true,
        description: "Project Document to select the navigation",
    },
};
