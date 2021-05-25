import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IStopStopWatch,
} from '../../StopWatchContainer/Store/StopWatchStateBundle';

export default function* stopStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IStopStopWatch> = yield take(ActionTypes.STOP_STOPWATCH);
        
        if (action) {
            console.log('Stopping a StopWatch');
        }
    }
}