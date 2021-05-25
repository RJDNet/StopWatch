import {
    Store,
    Unsubscribe
} from 'redux';

import { IState } from './IState';

export let store: Readonly<Store<IState>>;

export function getState(): Readonly<IState> {
    return store.getState();
}

export function setStore(storeToSet: Readonly<Store<IState>>): void {
    store = storeToSet;
}

export function dispatch(action: { type: string }): void {
    if (store !== undefined) {
        store.dispatch(action);
    }
}

export function subscribe(listener: () => void): Unsubscribe {
    return store.subscribe(listener);
}