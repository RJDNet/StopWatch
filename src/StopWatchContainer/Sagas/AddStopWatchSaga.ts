import {
    TakeEffect,
    take
} from 'redux-saga/effects';

import { 
    ActionTypes, 
    IAddStopWatch,
} from '../Store/StopWatchStateBundle';

export default function* addStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IAddStopWatch> = yield take(ActionTypes.ADD_STOPWATCH);
        
        if (action) {
            console.log('Added a StopWatch');
        }
    }
}
