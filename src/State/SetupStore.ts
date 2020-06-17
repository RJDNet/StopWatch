import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  Store,
  Reducer
} from 'redux';
import { sagaMiddleware } from './Saga';
import { IState } from './IState';
import { initialStoreState } from './InitialState';
import { getReducers } from './GetReducers';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION__: Function
    }
}

const composeEnhancers: <GenericStoreEnhancer>(f: GenericStoreEnhancer) => GenericStoreEnhancer = composeWithDevTools({
  serialize: true
});

export function setupStore(initialState: IState = initialStoreState()): Readonly<Store<IState>> {
  const reducer: Reducer<{}> = combineReducers(getReducers());
  return createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
  ) as Store<IState>;
}
