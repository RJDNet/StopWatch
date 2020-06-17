import { 
    ActionTypes, 
    IRemoveStopWatch,
} from '../../StopWatchContainer/Store/StopWatchStateBundle';
import {
    TakeEffect,
    take
} from 'redux-saga/effects';

export default function* removeStopWatchSaga(): IterableIterator<TakeEffect> {
    while (true) {
        const action: Readonly<IRemoveStopWatch> = yield take(ActionTypes.REMOVE_STOPWATCH);
        
        if (action) {
            console.log('Removing a StopWatch');
        }
    }
}