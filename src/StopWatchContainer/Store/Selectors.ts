import { IState } from "../../State/IState";
import { IStopWatch } from "./StopWatchStateBundle";

export const getStopWatchList = (state: IState): string[] => {
    return state.stopWatchState.filteredList;
};

export const getStopWatch = (id: string, state: IState): IStopWatch | undefined => {
    if (state.stopWatchState.stopWatches[id]) {
        return state.stopWatchState.stopWatches[id];
    }
    
    return undefined;
};