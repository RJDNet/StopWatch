import { all } from 'redux-saga/effects';

import addStopWatchSaga from './AddStopWatchSaga';
import addXStopWatchSaga from './AddXStopWatchSaga';
import removeAllStopWatchSaga from './RemoveAllStopWatchSaga';

export default function* rootSaga() {
  yield all([
    addStopWatchSaga(),
    addXStopWatchSaga(),
    removeAllStopWatchSaga()
  ]);
}