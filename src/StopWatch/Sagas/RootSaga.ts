import { all } from 'redux-saga/effects';

import startStopWatchSaga from './StartStopWatchSaga';
import stopStopWatchSaga from './StopStopWatchSaga';
import tickStopWatchSaga from './TickStopWatchSaga';
import resetStopWatchSaga from './ResetStopWatchSaga';
import removeStopWatchSaga from './RemoveStopWatchSaga';

export default function* rootSaga() {
  yield all([
    startStopWatchSaga(),
    stopStopWatchSaga(),
    tickStopWatchSaga(),
    resetStopWatchSaga(),
    removeStopWatchSaga()
  ]);
}