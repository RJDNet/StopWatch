import {
    default as createSagaMiddleware,
    SagaMiddleware
} from 'redux-saga';
import { all } from 'redux-saga/effects';

import stopWatchContainerRootSaga from '../StopWatchContainer/Sagas/RootSaga';
import stopWatchRootSaga from '../StopWatch/Sagas/RootSaga';

export const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

export function startRootSaga(): void {
    sagaMiddleware.run(rootSaga);
}

export function* rootSaga() {
    yield all([
        stopWatchContainerRootSaga(),
        stopWatchRootSaga()
    ]);
}
