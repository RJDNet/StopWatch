import { stopWatchReducer } from '../StopWatchContainer/Store/StopWatchStateBundle';

export function getReducers(): {} {
    return {
        stopWatchState: stopWatchReducer
    };
}