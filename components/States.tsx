import { client as clientsInterface } from '~/interfaces/framework';
import { clients as defaultClients } from '~/interfaces/defaultClientsState.json';
import createPersistedState from 'use-persisted-state';

const defaultClientsState: clientsInterface[] = defaultClients;
const clientsState = createPersistedState('clients');

export const useClientState = (clientKey: string) => {
    const [clients, setClients] = clientsState(defaultClientsState);

    const client = clients.filter(client => client.key === clientKey)[0];
    type clientType = typeof client;

    const setClientState = function <T extends Exclude<keyof clientType, 'key'>> (key: T, value: clientType[T]) {
        const newClient: clientType = Object.create(client);
        newClient[key] = value;
        setClients(clients.map(client => client.key === clientKey ? newClient : client));
    }

    const returnValue: [clientType, (<T extends Exclude<keyof clientType, 'key'>>(key: T, value: clientType[T]) => void)] = [client, setClientState];
    return returnValue;
};

export const useEventState = (clientKey: string, eventKey: string) => {
    const [client, setClientState] = useClientState(clientKey);

    const event = client.events.filter(event =>  event.key === eventKey)[0];
    type eventType = typeof event;

    const setEventState = function <T extends Exclude<keyof eventType, 'key'>> (key: T, value: eventType[T]) {
        const newEvent: eventType = Object.create(event);
        newEvent[key] = value;
        setClientState('events', client.events.map(event => event.key === eventKey ? newEvent : event));
    }

    const returnValue: [eventType, (<T extends Exclude<keyof eventType, 'key'>>(key: T, value: eventType[T]) => void)] = [event, setEventState];
    return returnValue;

}