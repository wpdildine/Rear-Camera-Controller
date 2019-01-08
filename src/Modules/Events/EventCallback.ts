import {EventListener} from "./EventListener";

    /**
     * The [[EventCallback]] allows you to invoke a function with a set of parameters across many objects at once.
     */
    export class EventCallback
    {
        private listeners: EventListener[] = [];
        private newListeners: EventListener[] = [];

        public addListener(object: any, priority: number = 0): void
        {
            this.removeListener(object);
            this.newListeners.push(new EventListener(object, priority));
        }

        public removeListener(object: any): void
        {
            this.listeners = this.listeners.filter(function(listener)
            {
                return listener.object != object;
            });

            this.newListeners = this.newListeners.filter(function(listener)
            {
                return listener.object != object;
            });
        }

        /**
         * This is useful if you'd like to update the new listeners, but not waste time on the ones already added
         */
        public invokeNewListeners(method: string, ...args): void
        {
            let object, stopFlag, listener;
            for (let i = 0, l = this.newListeners.length; i < l; ++i)
            {
                listener = this.newListeners[i];
                this.listeners.push(listener);

                object = listener.object;

                stopFlag = object[method].apply(object, args) as boolean;

                if (stopFlag !== undefined)
                {
                    return stopFlag;
                }
            }

            this.listeners.sort(function(a: EventListener, b: EventListener): number
            {
                return a.priority - b.priority;
            });

            this.newListeners.length = 0;
        }

        /**
         * Invokes all listeners by calling their function identified by *method* with arguments *args*
         */
        public invokeListeners(method: string, ...args): void
        {
            let i, l, object, stopFlag;
            for (i = 0, l = this.listeners.length; i < l; ++i)
            {
                object = this.listeners[i].object;

                stopFlag = object[method].apply(object, args) as boolean;

                if (stopFlag !== undefined)
                {
                    return stopFlag;
                }
            }

            if(this.newListeners.length === 0)
            {
                return;
            }

            for (i = 0, l = this.newListeners.length; i < l; ++i)
            {
                let listener = this.newListeners[i];
                this.listeners.push(listener);

                object = listener.object;

                stopFlag = object[method].apply(object, args) as boolean;

                if (stopFlag !== undefined)
                {
                    return stopFlag;
                }
            }

            this.listeners.sort(function(a : EventListener, b : EventListener) : number
            {
                return a.priority - b.priority;
            });

            this.newListeners.length = 0;
        }
    }
