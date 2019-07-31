import { IRemoveStopWatch } from './StopWatchStateBundle';
import uuidv1 from 'uuid/v1';

// Action Types
export enum ActionTypes {
    ADD_STOPWATCH = 'ADD_STOPWATCH',
    ADDX_STOPWATCH = 'ADDX_STOPWATCH',
    REMOVEALL_STOPWATCH = 'REMOVEALL_STOPWATCH',
    REMOVE_STOPWATCH = 'REMOVE_STOPWATCH',
    START_STOPWATCH = 'START_STOPWATCH',
    STOP_STOPWATCH = 'STOP_STOPWATCH',
    TICK_STOPWATCH = 'TICK_STOPWATCH',
    RESET_STOPWATCH = 'RESET_STOPWATCH'
}

// Action Interfaces
export interface IAddStopWatch {
    type: ActionTypes.ADD_STOPWATCH;
}

export interface IAddXStopWatch {
    type: ActionTypes.ADDX_STOPWATCH;
    payload: {
        amount: number;
    }
}

export interface IRemoveAllStopWatch {
    type: ActionTypes.REMOVEALL_STOPWATCH;
}

export interface IRemoveStopWatch {
    type: ActionTypes.REMOVE_STOPWATCH;
    payload: {
        key: string;
    }
}

export interface IStartStopWatch {
    type: ActionTypes.START_STOPWATCH;
    payload: {
        key: string;
    }
}

export interface IStopStopWatch {
    type: ActionTypes.STOP_STOPWATCH;
    payload: {
        key: string;
    }
}

export interface ITickStopWatch {
    type: ActionTypes.TICK_STOPWATCH;
    payload: {
        key: string;
    }
}

export interface IResetStopWatch {
    type: ActionTypes.RESET_STOPWATCH;
    payload: {
        key: string;
    }
}

// Consolidate Action Interfaces
export type Actions = IAddStopWatch |
    IAddXStopWatch |
    IRemoveAllStopWatch |
    IRemoveStopWatch |
    IStartStopWatch |
    IStopStopWatch |
    ITickStopWatch |
    IResetStopWatch;

// Action Creators
export const actionCreators = {
    addWatch(): IAddStopWatch {
        const action: IAddStopWatch = {
            type: ActionTypes.ADD_STOPWATCH
        }
        
        return action;
    },
    addXWatch(amount: number): IAddXStopWatch {
        const action: IAddXStopWatch = {
            type: ActionTypes.ADDX_STOPWATCH,
            payload: {
                amount
            }
        }
        
        return action;
    },
    removeAllWatches(): IRemoveAllStopWatch {
        const action: IRemoveAllStopWatch = {
            type: ActionTypes.REMOVEALL_STOPWATCH
        }
        
        return action;
    },
    removeWatch(key: string): IRemoveStopWatch {
        const action: IRemoveStopWatch = {
            type: ActionTypes.REMOVE_STOPWATCH,
            payload: {
                key
            }
        }
        
        return action;
    },
    startWatch(key: string): IStartStopWatch {
        const action: IStartStopWatch = {
            type: ActionTypes.START_STOPWATCH,
            payload: {
                key
            }
        }
        
        return action;
    },
    stopWatch(key: string): IStopStopWatch {
        const action: IStopStopWatch = {
            type: ActionTypes.STOP_STOPWATCH,
            payload: {
                key
            }
        }
            
        return action;
    },
    tickWatch(key: string): ITickStopWatch {
        const action: ITickStopWatch = {
            type: ActionTypes.TICK_STOPWATCH,
            payload: {
                key
            }
        }
            
        return action;
    },
    resetWatch(key: string): IResetStopWatch {
        const action: IResetStopWatch = {
            type: ActionTypes.RESET_STOPWATCH,
            payload: {
                key
            }
        }
        
        return action;
    }
}

export interface IStopWatch {
    time: number;
    running: boolean;
    key: string;
}

export interface IStopWatchMap {
    [key: string]: IStopWatch;
}

export interface IStopWatchState {
    stopWatches: IStopWatchMap;
    stopWatchList: string[];
}

// Default value of store
export function getInitialStopWatchState(): Readonly<IStopWatchState> {
    const state: Readonly<IStopWatchState> = {
        stopWatches: {},
        stopWatchList: []
    }

    return state;
}

// Sub Reducers
export function addWatch(state: IStopWatchState): IStopWatchState {
    const key: string = uuidv1();

    const update: IStopWatchState = {
        ...state,
        stopWatches: {
            ...state.stopWatches,
            [key]: {
                time: 0,
                running: false,
                key
            }
        },
        stopWatchList: [...state.stopWatchList, key]
    }

    return update;
}

export function addXWatch(state: IStopWatchState, action: IAddXStopWatch): IStopWatchState {
    const { amount } = action.payload;
    let update = state;
    
    for(let i = 1; i <= amount; i++) {
        const key: string = uuidv1();
        let newUpdate: IStopWatchState = {
            ...update,
            stopWatches: {
                ...update.stopWatches,
                [key]: {
                    time: 0,
                    running: false,
                    key
                }
            },
            stopWatchList: [...update.stopWatchList, key]
        }

        update = newUpdate;
    }
    

    return update;
}

function removeAllWatches(state: IStopWatchState): IStopWatchState {
    const update: IStopWatchState = {
        ...state,
        stopWatches: {},
        stopWatchList: []
    }

    return update;
}

function removeWatch(state: IStopWatchState, action: IRemoveStopWatch): IStopWatchState {
    const { key } = action.payload;
    const delKey = {
        ...state
    }
    delete delKey.stopWatches[key]

    const update: IStopWatchState = {
        ...state,
        stopWatches: {
            ...delKey.stopWatches
        },
        stopWatchList: state.stopWatchList.filter(f => f !== key)
    }

    return update;
}

function startWatch(state: IStopWatchState, action: IStartStopWatch): IStopWatchState {
    const { key } = action.payload;

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

    return update;
}

function stopWatch(state: IStopWatchState, action: IStopStopWatch): IStopWatchState {
    const { key } = action.payload;

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

    return update;
}

function tickWatch(state: IStopWatchState, action: ITickStopWatch): IStopWatchState {
    const { key } = action.payload;

    if (state.stopWatches[key] && state.stopWatches[key].running) {
        const time: number = state.stopWatches[key].time + 1;
        const update: IStopWatchState = {
            ...state,
            stopWatches: {
                ...state.stopWatches,
                [key]: {
                    ...state.stopWatches[key],
                    time
                }
            }
        }
    
        return update;
    }

    return state;
}

function resetWatch(state: IStopWatchState, action: IResetStopWatch): IStopWatchState {
    const { key } = action.payload;

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

    return update;
}

// Reducer
export const stopWatchReducer = (state: IStopWatchState = getInitialStopWatchState(), action: Actions ) => {
    switch (action.type) {
      case ActionTypes.ADD_STOPWATCH:
        return addWatch(state);
      case ActionTypes.ADDX_STOPWATCH:
        return addXWatch(state, action);
      case ActionTypes.REMOVEALL_STOPWATCH:
        return removeAllWatches(state);
      case ActionTypes.REMOVE_STOPWATCH:
        return removeWatch(state, action);
      case ActionTypes.START_STOPWATCH: 
        return startWatch(state, action);
      case ActionTypes.STOP_STOPWATCH: 
        return stopWatch(state, action);
      case ActionTypes.TICK_STOPWATCH: 
        return tickWatch(state, action);
      case ActionTypes.RESET_STOPWATCH: 
        return resetWatch(state, action);
      default: return state;
    }
}

// Helpers
// function uuidv4() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
//   }

// export function uuidv4() {
//     var dt = new Date().getTime();
//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = (dt + Math.random()*16)%16 | 0;
//         dt = Math.floor(dt/16);
//         return (c==='x' ? r :(r&0x3|0x8)).toString(16);
//     });
//     return uuid;
// }
