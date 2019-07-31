import { 
    ActionTypes, 
    IRemoveAllStopWatch
} from '../Store/StopWatchStateBundle';
import {
    TakeEffect,
    take
} from 'redux-saga/effects';

export default function* removeAllStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IRemoveAllStopWatch> = yield take(ActionTypes.REMOVEALL_STOPWATCH);
        
        if (action) {
            console.log('Removed All StopWatches');
        }
    }
}
