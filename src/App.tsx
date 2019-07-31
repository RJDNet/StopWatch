import React from 'react';
import { Provider } from 'react-redux';
import StopWatchContainer from './StopWatchContainer/Components/StopWatchContainer';
import { setStore } from './State/Store';
import { setupStore } from './State/SetupStore';
import { startRootSaga } from './State/Saga';

const store: any = setupStore();
setStore(store);
startRootSaga()

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Provider store={store}>
        <StopWatchContainer />
      </Provider>
    </div>
    );
  }

export default App;