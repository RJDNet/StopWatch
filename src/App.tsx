import React from 'react';
import { Provider } from 'react-redux';

import { setStore } from './State/Store';
import { setupStore } from './State/SetupStore';
import { startRootSaga } from './State/Saga';
import StopWatchContainer from './StopWatchContainer/Components/StopWatchContainer';

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