/**@format */

function _handler(db) {
    const database = db;

    const dbPutter = async (query) => {
        const values = query["values"];

        const errors = [];
        const result = { result: "success", error: errors };
        let hasOps = false;
        let total = 0;

        return new Promise((resolve) => {
            const aPutters = [];
            if (values && Array.isArray(values)) {
                for (const item of values) {
                    if (item.key && item.value) {
                        total += 1;
                        hasOps = true;
                        aPutters.push(
                            new Promise((res) => {
                                database.put(item.key, item.value, (error) => {
                                    error && errors.push(error);

                                    res();
                                });
                            }),
                        );
                    }
                }
            }
            if (0 === aPutters.length) {
                aPutters.push(Promise.resolve());
            }

            if (!hasOps) {
                result.result = "non-ops";
            } else if (errors.length > 0 && errors.length === total) {
                result.result = "error";
            } else if (errors.length > 0) {
                result.result = "failed";
            }

            resolve(result);
        });
    };

    const dbGetter = async (query) => {
        const keys = query["keys"];

        const errors = [];
        const values = {};
        const result = { result: "success", error: errors, values: values };
        let hasOps = false;
        let total = 0;

        return new Promise((resolve) => {
            const aGetters = [];
            if (keys && Array.isArray(keys)) {
                for (const item of keys) {
                    if (item) {
                        hasOps = true;
                        total += 1;
                        aGetters.push(
                            new Promise((res) => {
                                database.get(item, (error, value) => {
                                    values[item] = value || "";
                                    error && errors.push(error);

                                    res();
                                });
                            }),
                        );
                    }
                }
            }
            if (0 === aGetters.length) {
                aGetters.push(Promise.resolve());
            }

            Promise.all(aGetters).finally(() => {
                if (!hasOps) {
                    result.result = "non-ops";
                } else if (errors.length > 0 && errors.length === total) {
                    result.result = "error";
                } else if (errors.length > 0) {
                    result.result = "failed";
                }

                resolve(result);
            });
        });
    };

    const dbDeleter = async (query) => {
        const keys = query["keys"];

        const errors = [];
        const result = { result: "success", error: errors };
        let hasOps = false;
        let total = 0;

        return new Promise((resolve) => {
            const aDeleters = [];
            if (keys && Array.isArray(keys)) {
                for (const item of keys) {
                    if (item) {
                        hasOps = true;
                        total += 1;
                        aDeleters.push(
                            new Promise((res) => {
                                database.delete(item, (error) => {
                                    errors.push(error);

                                    res();
                                });
                            }),
                        );
                    }
                }
            }
            if (0 === aDeleters.length) {
                aDeleters.push(Promise.resolve());
            }

            if (!hasOps) {
                result.result = "non-ops";
            } else if (errors.length > 0 && errors.length === total) {
                result.result = "error";
            } else if (errors.length > 0) {
                result.result = "failed";
            }

            resolve(result);
        });
    };

    async function _handlerInner(query) {
        const sq = JSON.stringify(query);
        console.log(sq);

        const opType = query["type"];
        if (opType) {
            switch (opType) {
                case "put":
                    return await dbPutter(query);
                case "get":
                    return await dbGetter(query);
                case "delete":
                    return await dbDeleter(query);
                default:
                    break;
            }
        }

        return { result: "failed" };
    }

    return _handlerInner;
}

module.exports.handler = _handler;
