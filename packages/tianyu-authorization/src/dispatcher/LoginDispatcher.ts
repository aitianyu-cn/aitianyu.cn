/**
 * @format
 *
 * User login - user register and password retrieve
 */

import { DatabasePools } from "aitianyu-server-base";
import { HttpHandler } from "aitianyu-server-base";

export class LoginDispatcher {
    private dbPool: DatabasePools;

    public constructor(databasePool: DatabasePools) {
        this.dbPool = databasePool;
    }

    createDispatches(handler: HttpHandler) {
        //
    }
}
