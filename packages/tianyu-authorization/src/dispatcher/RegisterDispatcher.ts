/**
 * @format
 *
 * User login - user register and password retrieve
 */

import { DatabasePools } from "@aitianyu.cn/server-base";
import { HttpHandler } from "@aitianyu.cn/server-base";

export class RegisterDispatcher {
    private dbPool: DatabasePools;

    public constructor(databasePool: DatabasePools) {
        this.dbPool = databasePool;
    }

    createDispatches(handler: HttpHandler) {
        //
    }
}
