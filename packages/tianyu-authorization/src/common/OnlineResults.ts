/**@format */

export const ONLINE_RESULT = {
    SUCCESS: 0,
    LOST_INFO: -1,
    WRONG_USER: -2,
    WRONG_PW: -3,
    LOCAL_USING: -4,
    SYSTEM_WRONG: -100,
};

export const ONLINE_RESULT_MESSAGE = {
    LOST_USER: 1000,
    LOST_PW: 1001,
    LOST_LOCATION: 1002,
};

export enum OnlineState {
    ONLINE = 1,
    OFFLINE = 0,
}
