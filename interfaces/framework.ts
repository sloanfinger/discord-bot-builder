import djs from './djs.json';

let djsEvents = djs.classes.Client.events;

export interface ExpandableObject<T> {
    [key: string]: T
}

export interface action {
    arguments: string[],
    discriminator: 'action',
    method: string,
    name: string,
    target: string
}

export interface condition {
    actions: (action | condition)[],
    caseSensitive?: boolean,
    comparison: string,
    discriminator: 'condition',
    key: string,
    name: string,
    // operator?: '==' | '===' | '!=' | '!===' | '>' | '<' | '>',
    operator: string,
    property: string | number | boolean,
    target: string
}

export interface event {
    asynchronous?: boolean,
    actions: (action | condition)[],
    discriminator: 'event',
    emit?: string[],
    event: keyof typeof djsEvents,
    key: string,
    name: string
}

export interface client {
    discriminator: 'client',
    events: event[],
    key: string,
    name: string,
    token?: string
}