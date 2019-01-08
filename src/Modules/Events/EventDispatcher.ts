import {EventCallback} from "./EventCallback"
    /**
     * Allows you to call [[EventCallback.invokeListeners]] on a collection of [[EventCallback]]s
     */
    export class EventDispatcher
    {
        /**
         * A map of event names to [[EventCallback]] objects
         */
        private dispatchers : {[eventName: string]: EventCallback} = {};

        /**
         * Adds an object as a listener for event *eventName* to an internal [[EventCallback]] with priority *priority*
         */
        public addEventListener(eventName: string, object: any, priority: number = 0): void
        {
            if (!this.dispatchers[eventName])
            {
                this.dispatchers[eventName] = new EventCallback();
            }

            (this.dispatchers[eventName] as EventCallback).addListener(object, priority);
        }

        /**
         * Trigger an event on the appropriate [[EventCallback]] by calling [[EventCallback.invokeListeners]] on it
         */
        public trigger(eventName: string, ...args): any
        {
            let dispatcher = this.dispatchers[eventName];

            if (dispatcher)
            {
                return dispatcher.invokeListeners.apply(dispatcher, arguments);
            }
        }
    }
