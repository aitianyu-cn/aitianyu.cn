/**
 * @format
 *
 * User login - user register and password retrieve
 */

const DatabasePools = require("../../../common/service/DatabasePools");
const HttpHandler = require("../../../common/handler/HttpHandler");

class LoginDispatcher {
    /**
     *
     * @param {DatabasePools} databasePool
     */
    constructor(databasePool) {
        /**@type {DatabasePools}  */
        this.dbPool = databasePool;
    }

    /**
     *
     * @param {HttpHandler} handler
     */
    createDispatches(handler) {
        //
    }
}

module.exports = LoginDispatcher;
