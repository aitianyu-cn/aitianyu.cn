"use strict";
/**@format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONLINE_STATE = exports.ONLINE_RESULT_MESSAGE = exports.ONLINE_RESULT = void 0;
exports.ONLINE_RESULT = {
    SUCCESS: 0,
    LOST_INFO: -1,
    WRONG_USER: -2,
    WRONG_PW: -3,
    LOCAL_USING: -4,
    INACCESSIBLE: -5,
    SYSTEM_WRONG: -100,
};
exports.ONLINE_RESULT_MESSAGE = {
    LOST_USER: 1000,
    LOST_PW: 1001,
    LOST_LOCATION: 1002,
};
exports.ONLINE_STATE = {
    ONLINE: 1,
    OFFLINE: 0,
    ERROR: -1,
};
