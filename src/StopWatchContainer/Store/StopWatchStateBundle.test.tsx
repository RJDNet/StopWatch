import {  
    getInitialStopWatchState, 
    actionCreators,
    stopWatchReducer,
    ActionTypes,
    Actions,
    IStopWatchState 
} from './StopWatchStateBundle';
import uuidv1 from 'uuid/v1';

describe('actions', () => {
    test('should create an action to add a stopwatch', () => {
        const expectedAction: Actions = {
            type: ActionTypes.ADD_STOPWATCH
        }

        expect(actionCreators.addWatch()).toEqual(expectedAction)
    });

    test('should create an action to remove all stopwatches', () => {
        const expectedAction: Actions = {
            type: ActionTypes.REMOVEALL_STOPWATCH
        }

        expect(actionCreators.removeAllWatches()).toEqual(expectedAction)
    });

    test('should create an action to remove a stopwatch', () => {
        const key = uuidv1();
        const expectedAction: Actions = {
            type: ActionTypes.REMOVE_STOPWATCH,
            payload: {
                key
            }
        }

        expect(actionCreators.removeWatch(key)).toEqual(expectedAction)
    });

    test('should create an action to start a stopwatch', () => {
        const key = uuidv1();
        const expectedAction: Actions = {
            type: ActionTypes.START_STOPWATCH,
            payload: {
                key
            }
        }

        expect(actionCreators.startWatch(key)).toEqual(expectedAction)
    });

    test('should create an action to stop a stopwatch', () => {
        const key = uuidv1();
        const expectedAction: Actions = {
            type: ActionTypes.STOP_STOPWATCH,
            payload: {
                key
            }
        }

        expect(actionCreators.stopWatch(key)).toEqual(expectedAction)
    });

    test('should create an action to tick a stopwatch', () => {
        const key = uuidv1();
        const expectedAction: Actions = {
            type: ActionTypes.TICK_STOPWATCH,
            payload: {
                key
            }
        }

        expect(actionCreators.tickWatch(key)).toEqual(expectedAction)
    });

    test('should create an action to reset a stopwatch', () => {
        const key = uuidv1();
        const expectedAction: Actions = {
            type: ActionTypes.RESET_STOPWATCH,
            payload: {
                key
            }
        }

        expect(actionCreators.resetWatch(key)).toEqual(expectedAction)
    });
  });

describe('reducers', () => {
    test('unknown action returns initial state', () => {
        const state = getInitialStopWatchState();
        const expectedAction: any = {
            type: 'mockAction'
        }

        expect(stopWatchReducer(undefined, expectedAction)).toEqual(state);
    });

    test('adding a stopwatch returns as defined', () => {
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.ADD_STOPWATCH
        }
        const reducerResult = stopWatchReducer(state, expectedAction);

        expect(reducerResult).toBeDefined();
        expect(reducerResult.stopWatchList.length).toBe(1);
    });

    test('removing all stopwatches returns same value as initial state', () => {
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.REMOVEALL_STOPWATCH
        }

        const update: IStopWatchState = {
            ...state,
            stopWatches: {},
            stopWatchList: []
        }

        expect(update).toEqual(state);
        expect(stopWatchReducer(state, expectedAction)).toEqual(state);
    });

    test('removing a stopwatch removes key from state', () => {
        const key = uuidv1();
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.REMOVE_STOPWATCH,
            payload: {
                key
            }
        }
        const delKey = {
            ...state
        }
        delete delKey.stopWatches[key]

        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...delKey.stopWatches
            },
            stopWatchList: state.stopWatchList.filter(f => f != key)
        }

        expect(update).toEqual(state);
        expect(stopWatchReducer(state, expectedAction)).toEqual(state);
    });

    test('starting a stopwatch returns as defined with correct values', () => {
        const key = uuidv1();
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.START_STOPWATCH,
            payload: {
                key
            }
        }
        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...state.stopWatches,
                [key]: {
                    ...state.stopWatches[key],
                    running: true
                }
            }
        }
        const reducerResult = stopWatchReducer(state, expectedAction);

        expect(reducerResult).toBeDefined();
        expect(Object.keys(reducerResult.stopWatches)[0]).toBe(Object.keys(update.stopWatches)[0]);
        expect(reducerResult.stopWatches[key].running).toBe(update.stopWatches[key].running);
    });

    test('stoping a stopwatch returns as defined with correct values', () => {
        const key = uuidv1();
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.STOP_STOPWATCH,
            payload: {
                key
            }
        }
        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...state.stopWatches,
                [key]: {
                    ...state.stopWatches[key],
                    running: false
                }
            }
        }
        const reducerResult = stopWatchReducer(state, expectedAction);

        expect(reducerResult).toBeDefined();
        expect(Object.keys(reducerResult.stopWatches)[0]).toBe(Object.keys(update.stopWatches)[0]);
        expect(reducerResult.stopWatches[key].running).toBe(update.stopWatches[key].running);
    });

    test('ticking a stopwatch returns as defined with correct values', () => {
        const key = uuidv1();
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.TICK_STOPWATCH,
            payload: {
                key
            }
        }
        const time: number = 0;
        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...state.stopWatches,
                [key]: {
                    ...state.stopWatches[key],
                    running: true,
                    time
                }
            }
        }
        const reducerResult = stopWatchReducer(update, expectedAction);

        expect(reducerResult).toBeDefined();
        expect(Object.keys(reducerResult.stopWatches)[0]).toBe(key);
        expect(reducerResult.stopWatches[key].running).toBe(true);
        expect(reducerResult.stopWatches[key].time).toBe(1);
    });

    test('reseting a stopwatch returns as defined with correct values', () => {
        const key = uuidv1();
        const state = getInitialStopWatchState();
        const expectedAction: Actions = {
            type: ActionTypes.RESET_STOPWATCH,
            payload: {
                key
            }
        }
        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...state.stopWatches,
                [key]: {
                    ...state.stopWatches[key],
                    running: false,
                    time: 0
                }
            }
        }
        const reducerResult = stopWatchReducer(state, expectedAction);

        expect(reducerResult).toBeDefined();
        expect(Object.keys(reducerResult.stopWatches)[0]).toBe(key);
        expect(reducerResult.stopWatches[key].running).toBe(update.stopWatches[key].running);
        expect(reducerResult.stopWatches[key].time).toBe(update.stopWatches[key].time);
    });
});