import framework from '~/interfaces/framework.json';
import createPersistedState from 'use-persisted-state';

const clientsState = createPersistedState('clients');
const defaultClientsState = framework.clients;

export const useClientState = (key: string) => {
    const [state, setState] = clientsState(defaultClientsState);
    return [state.filter(client => client.key === key)[0]];
};

export const useEventState = (client: ReturnType<typeof useClientState>[0], key: string) => {
    return [Object.values(client.events).reduce((p, c) => p.concat(c), []).filter(event => event.key === key)[0]];
}