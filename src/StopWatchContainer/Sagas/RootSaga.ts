import { all } from 'redux-saga/effects';

import addStopWatchSaga from './AddStopWatchSaga';
import removeAllStopWatchSaga from './RemoveAllStopWatchSaga';

export default function* rootSaga() {
  yield all([
    addStopWatchSaga(),
    removeAllStopWatchSaga()
  ]);
}