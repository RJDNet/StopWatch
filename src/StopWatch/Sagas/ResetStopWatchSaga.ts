import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IResetStopWatch,
} from '../../StopWatchContainer/Store/StopWatchStateBundle';

export default function* resetStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IResetStopWatch> = yield take(ActionTypes.RESET_STOPWATCH);
        
        if (action) {
            console.log('Resetting a StopWatch');
        }
    }
}