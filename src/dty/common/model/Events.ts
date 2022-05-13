/**@format */

export interface IEventListener<eventValue> {
    fire(event: eventValue, sender?: any): void;
    removed(sender?: any): void;
}

interface IEventListenerContainer<eventValue> {
    [key: string]: IEventListener<eventValue>;
}

export class EventAdapter<eventValue> {
    private eventListeners: IEventListenerContainer<eventValue>;

    public constructor() {
        this.eventListeners = {};
    }

    public count(): number {
        return Object.keys(this.eventListeners).length;
    }
    public clear(): void {
        const aKeys: string[] = Object.keys(this.eventListeners);

        for (const key of aKeys) {
            this.eventListeners[key].removed();
        }

        this.eventListeners = {};
    }

    public addListener(listener: string, listenerInstance: IEventListener<eventValue>): void {
        this.removeListener(listener);
        this.eventListeners[listener] = listenerInstance;
    }
    public removeListener(listener: string): void {
        if (this.containsListener(listener)) {
            this.eventListeners[listener].removed();
            delete this.eventListeners[listener];
        }
    }
    public containsListener(listener: string): boolean {
        return !!this.eventListeners[listener];
    }

    public fireEvent(listener: string, event: eventValue, _sender?: any): void {
        this.eventListeners[listener]?.fire(event, _sender);
    }
    public fireEvents(event: eventValue, sender?: any): void {
        const aKeys: string[] = Object.keys(this.eventListeners);

        for (const key of aKeys) {
            this.eventListeners[key].fire(event, sender);
        }
    }

    public fireEventAsync(listener: string, event: eventValue, sender?: any): void {
        setTimeout(() => {
            this.eventListeners[listener]?.fire(event, sender);
        }, 0);
    }
    public fireEventsAsync(event: eventValue, sender?: any): void {
        const aKeys: string[] = Object.keys(this.eventListeners);

        for (const key of aKeys) {
            setTimeout(() => {
                this.eventListeners[key]?.fire(event, sender);
            }, 0);
        }
    }
}

export type IStringEventListener = IEventListener<string>;

export type StringEventAdapter = EventAdapter<string>;
