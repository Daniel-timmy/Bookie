import { Event } from "models/Event.model";

export interface IEvent extends Event {
 
}

export interface IEvents {
    events: Event[]
}