import { 
    createStore, 
    Store, 
    combineReducers,
    Reducer
  } from 'redux';

import { IState } from '../IState';
import {
    IStopWatchState,
    getInitialStopWatchState
} from '../../StopWatchContainer/Store/StopWatchStateBundle';
import { getReducers } from '../../State/GetReducers';

export function initialStoreState(): Readonly<IState> {
    const stopWatchState: IStopWatchState = { ...getInitialStopWatchState() };

    return {
        stopWatchState
    };
}

export function getState(): Readonly<IState> {
    const state: Readonly<IState> = initialStoreState();

    return { 
        ...state 
    };
}

export const dispatch = jest.fn();
export const subscribe = jest.fn();

export function setupStore(initialState: IState = getState()): Readonly<Store<IState>> {
    const reducer: Reducer<{}> = combineReducers(getReducers());

    return createStore(
        reducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ) as Store<IState>;
}
  
export function getMockState(): Readonly<IState> {
    return store.getState();
}

export let store: any = setupStore();

function setStore(storeToSet: Readonly<Store<IState>>): void {
    store = storeToSet;
}

setStore(store);
getMockState();
  