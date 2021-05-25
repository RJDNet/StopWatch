import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IRemoveAllStopWatch
} from '../Store/StopWatchStateBundle';

export default function* removeAllStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IRemoveAllStopWatch> = yield take(ActionTypes.REMOVEALL_STOPWATCH);
        
        if (action) {
            console.log('Removed All StopWatches');
        }
    }
}
