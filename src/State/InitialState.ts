import { IState } from './IState';
import {
    IStopWatchState,
    getInitialStopWatchState
} from '../StopWatchContainer/Store/StopWatchStateBundle';

export function initialStoreState(): Readonly<IState> {
    const stopWatchState: IStopWatchState = getInitialStopWatchState();

    return {
        stopWatchState: stopWatchState
    };
}