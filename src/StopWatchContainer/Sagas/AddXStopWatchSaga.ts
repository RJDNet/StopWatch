import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IAddXStopWatch,
} from '../Store/StopWatchStateBundle';

export default function* addXStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IAddXStopWatch> = yield take(ActionTypes.ADDX_STOPWATCH);
        
        if (action) {
            console.log(`Added ${action.payload.amount} StopWatches`);
        }
    }
}