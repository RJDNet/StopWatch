import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IStartStopWatch,
} from '../../StopWatchContainer/Store/StopWatchStateBundle';

export default function* startStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IStartStopWatch> = yield take(ActionTypes.START_STOPWATCH);
        
        if (action) {
            console.log('Starting a StopWatch');
        }
    }
}