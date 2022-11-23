/**@format */

const { createPool } = require("./MySqlService");
const { Pool } = require("mysql");

class DatabasePools {
    constructor(databaseConfig) {
        /**
         * @type {{[databaseName: string]: Pool}}
         */
        this.pool = {};

        /**
         * @type {{[key: string]:{[sql: string]: {timestamp: number, valid: boolean, data: any}}}}
         */
        this.sqlCache = {};

        this.databaseConfig = databaseConfig || require("../common/mysql.config.json");
    }

    /**
     *
     * @param {string} database
     * @returns {Pool}
     */
    get(database) {
        if (this.pool[database]) {
            return this.pool[database];
        }

        const newPool = createPool(database, this.databaseConfig);
        this.pool[database] = newPool;

        return newPool;
    }

    /**
     *
     * @param {string} database
     *
     * @return {boolean}
     */
    contains(database) {
        return !!this.pool[database];
    }

    /**
     *
     * @param {string} database
     */
    delete(database) {
        if (!this.contains(database)) {
            return;
        }

        const db = this.pool[database];
        db.end();

        delete this.pool[database];
    }

    destroy() {
        for (const db of Object.keys(this.pool)) {
            const pool = this.pool[db];
            pool.end();
        }
    }

    /**
     *
     * @param {string} database
     * @param {string} sql
     * @param {(any) => void} callback
     * @param {(any) => void} failed
     */
    execute(database, sql, callback, failed) {
        if (!!!this.sqlCache[database]) {
            this.sqlCache[database] = {};
        }

        if (!!this.sqlCache[database][sql]?.valid && !!this.sqlCache[database][sql].data) {
            const stamp = this.sqlCache[database][sql].timestamp;
            const overtime = Date.now() - stamp;
            if (overtime > 300000) {
                delete this.sqlCache[database][sql];
            } else {
                callback(this.sqlCache[database][sql].data);
                return;
            }
        }

        const pool = this.get(database);
        pool.getConnection((error, connection) => {
            if (error) {
                failed?.(error);
            } else {
                connection.query(sql, (error, results) => {
                    connection.release();

                    if (error) {
                        failed?.(error);
                    } else {
                        if (!!results) {
                            this.sqlCache[database][sql] = {
                                valid: true,
                                data: results,
                                timestamp: Date.now(),
                            };
                        }
                        callback(results);
                    }
                });
            }
        });
    }
}

module.exports = DatabasePools;
