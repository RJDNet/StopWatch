import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    ITickStopWatch,
} from '../../StopWatchContainer/Store/StopWatchStateBundle';

export default function* tickStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<ITickStopWatch> = yield take(ActionTypes.TICK_STOPWATCH);
        
        if (action) {
            console.log('Ticking a StopWatch');
        }
    }
}