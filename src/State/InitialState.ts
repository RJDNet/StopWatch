import {
    IStopWatchState,
    getInitialStopWatchState
} from '../StopWatchContainer/Store/StopWatchStateBundle';

import { IState } from './IState';

export function initialStoreState(): Readonly<IState> {
    const stopWatchState: IStopWatchState = getInitialStopWatchState();

    return {
        stopWatchState: stopWatchState
    };
}