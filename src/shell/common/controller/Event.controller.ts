/**@format */

import { CallbackActionT, MapOfType } from "ts-core/Types";

/**
 * Event Entity for each event
 */
export interface IEventEntity {
    /**
     * add a listener to event
     *
     * @param {string} listener the listener name (unique id for each different target callback, the same id will be rewrite)
     * @param {CallbackActionT<ICallbackEvent>} callback the trigger of the listener
     */
    listen(listener: string, callback: CallbackActionT<ICallbackEvent>): void;

    /**
     * remove a listener from this event
     *
     * @param listener the listener name
     */
    unlisten(listener: string): void;

    /**
     * get whether the listener is already added
     *
     * @param listener the listener name
     */
    containListener(listener: string): boolean;

    /**
     * get the current event entity is valid.
     *
     * if this return false, that means the event entity will never be triggered.
     */
    isValid(): boolean;
}

export interface ICallbackEvent {
    data: any;
}

export interface IEventTriggerResult {
    success: boolean;
    errors: any[];
    message?: string[];
}

export interface IEventTriggerEntity extends IEventEntity {
    invoke(ev: ICallbackEvent): Promise<void>;
    invokeSync(ev: ICallbackEvent): IEventTriggerResult;
}

const _InvalidEventEntity: IEventTriggerEntity = {
    listen: function (_listener: string, _callback: CallbackActionT<ICallbackEvent>): void {
        // there is nothing to do.
    },
    unlisten: function (_listener: string): void {
        // there is nothing to do.
    },
    containListener: function (_listener: string): boolean {
        // there will always return false since this is an invalid entity.
        return false;
    },
    isValid: function (): boolean {
        // there will always return false since this is an invalid entity.
        return false;
    },

    invoke: async function (ev: ICallbackEvent): Promise<void> {
        return Promise.reject();
    },
    invokeSync: function (ev: ICallbackEvent): IEventTriggerResult {
        // there is nothing to do.
        return {
            success: false,
            errors: [
                {
                    message: "this is not a valid event entity!",
                },
            ],
        };
    },
};

class EventEntity implements IEventTriggerEntity {
    private triggerList: MapOfType<CallbackActionT<ICallbackEvent>>;

    public constructor() {
        this.triggerList = {};
    }

    invoke(ev: ICallbackEvent): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const listeners = Object.keys(this.triggerList);
            if (listeners.length === 0) {
                resolve();
                return;
            }

            const invokeList: Promise<void>[] = [];
            for (const listener of listeners) {
                const trigger = this.triggerList[listener];

                invokeList.push(
                    new Promise<void>((resolve, reject) => {
                        try {
                            trigger(ev);
                            resolve();
                        } catch (e: any) {
                            reject(e);
                        }
                    }),
                );
            }

            Promise.all(invokeList).then(() => {
                resolve();
            }, reject);
        });
    }
    invokeSync(ev: ICallbackEvent): IEventTriggerResult {
        const listeners = Object.keys(this.triggerList);
        if (listeners.length === 0) {
            return {
                success: true,
                errors: [],
                message: ["[SKIPPED] there is no triggers needs to be processed"],
            };
        }

        const aErrors: any[] = [];
        let successCount: number = 0;
        let totalCount: number = 0;
        for (const listener of listeners) {
            const trigger = this.triggerList[listener];
            ++totalCount;

            try {
                trigger(ev);
                ++successCount;
            } catch (e: any) {
                aErrors.push(e);
            }
        }

        return {
            success: aErrors.length === 0,
            errors: aErrors,
            message: [`[TOTAL] ${totalCount}`, `[SUCCESS] ${successCount}`],
        };
    }

    public clean(): void {
        this.triggerList = {};
    }

    listen(listener: string, callback: CallbackActionT<ICallbackEvent>): void {
        this.triggerList[listener] = callback;
    }
    unlisten(listener: string): void {
        if (!!this.triggerList[listener]) {
            delete this.triggerList[listener];
        }
    }
    containListener(listener: string): boolean {
        return !!this.triggerList[listener];
    }
    isValid(): boolean {
        return true;
    }
}

interface IEventMap {
    triggerId: string;
    entity: EventEntity;
}

const _eventMap: MapOfType<IEventMap> = {};

export enum EventOperationResult {
    Success,
    NoExist,
    UnAccessible,
}

export class EventController {
    public static new(name: string, triggerId: string): IEventTriggerEntity {
        const event = _eventMap[name];
        if (!!event) {
            if (event.triggerId === triggerId) {
                return event.entity;
            } else {
                return _InvalidEventEntity;
            }
        }

        const newEntity = new EventEntity();
        _eventMap[name] = {
            triggerId: triggerId,
            entity: newEntity,
        };
        return newEntity;
    }
    public static delete(name: string, triggerId: string): EventOperationResult {
        const event = _eventMap[name];
        if (!!!event) {
            return EventOperationResult.NoExist;
        }

        if (event.triggerId !== triggerId) {
            return EventOperationResult.UnAccessible;
        }

        event.entity.clean();
        delete _eventMap[name];
        return EventOperationResult.Success;
    }
    public static containEvent(name: string): boolean {
        return !!_eventMap[name];
    }
    public static event(name: string): IEventEntity {
        const eventEntity = _eventMap[name]?.entity || _InvalidEventEntity;
        return eventEntity;
    }
}
