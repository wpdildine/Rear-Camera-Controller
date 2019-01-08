/**
 * Used by the [[EventDispatcher]] to register listeners of events
 */
export class EventListener
{
    public constructor(public object: any, public priority: number)
    {

    }
}
