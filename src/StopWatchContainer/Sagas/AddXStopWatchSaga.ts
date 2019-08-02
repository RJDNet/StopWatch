import { 
    ActionTypes, 
    IAddXStopWatch,
} from '../Store/StopWatchStateBundle';
import {
    TakeEffect,
    take
} from 'redux-saga/effects';

export default function* addXStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IAddXStopWatch> = yield take(ActionTypes.ADDX_STOPWATCH);
        
        if (action) {
            console.log('Added X StopWatches');
        }
    }
}