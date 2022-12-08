/**
 * @format
 *
 * User logon - user and password verify
 */

import { DatabasePools } from "aitianyu-server-base";
import { HttpHandler } from "aitianyu-server-base";

export class LogonDispatcher {
    private dbPool: DatabasePools;

    public constructor(databasePool: DatabasePools) {
        this.dbPool = databasePool;
    }

    createDispatches(handler: HttpHandler) {
        //
    }
}
