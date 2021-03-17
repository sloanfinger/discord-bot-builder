import djs from './djs.json';

let djsEvents = djs.classes.Client.events;

export interface condition {
    caseSensitive?: false,
    comparison?: string,
    condition?: condition,
    operator?: '==' | '===' | '!=' | '!===' | '>' | '<' | '>',
    property: string,
    target: string
}

export interface action {
    arguments: string[],
    condition?: condition,
    method: string,
    target: string
}

export interface event {
    asynchronous?: boolean,
    actions: action[],
    emit?: string[],
    event: keyof typeof djsEvents,
    key: string,
    name: string
}

export interface client {
    events: event[],
    key: string,
    name: string,
    token?: string
}