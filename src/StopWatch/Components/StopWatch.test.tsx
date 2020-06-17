import React from 'react';
import { Provider } from "react-redux";
import { 
  shallow, 
  ShallowWrapper 
} from 'enzyme';
import toJson from 'enzyme-to-json';
import ConnectedStopWatch, { 
  StopWatch, 
  mapStateToProps 
} from './StopWatch';
import uuidv1 from 'uuid/v1';
import { 
  store, 
  getState 
} from '../../State/__mocks__/Store';
import { ActionTypes } from '../../StopWatchContainer/Store/StopWatchStateBundle';

describe('StopWatch Component', () => {
  const key = uuidv1();
  const dispatch = jest.fn();
  const props = {
    className: 'stopwatch',
    id: 'testerid',
    stopWatch: {
      time: 0,
      running: false,
      key: key,
    },
    dispatch
  }

  test('StopWatch renders correctly with all props & no redux store', () => {
    const tree: ShallowWrapper = shallow(
      <StopWatch {...props} />
    );
      
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('StopWatch renders correctly with id & className props with redux store', () => {
    const tree: ShallowWrapper = shallow(
      <Provider store={store}>
        <ConnectedStopWatch className={'stopwatch'} id={'testerid'} />
      </Provider>
    );
      
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('mapStateToProps returns expected state', () => {
    const stopWatchState = getState();
    const state = {
      ...stopWatchState,
      stopWatchState: {
        stopWatches: {
          testid: 
            {
              time: 0,
              running: false,
              key: 'testid'
            }
        },    
        stopWatchList: ['testid']
      }
    }
    
    const own = {
      className: 'stopwatch',
      id: 'testid'
    }
    
    const result = mapStateToProps(state, own);

    expect(result).toBeDefined();
    expect(result.stopWatch).toEqual({ time: 0, running: false, key: 'testid'})
  });

  test('test button', () => {
    const tree: ShallowWrapper = shallow(
      <StopWatch {...props} />
    );

    const selectElement = tree.find('div').hasClass('stopwatch');
    expect(selectElement).toBe(true);
  });

  test('button click should startstop stopwatch', () => {
    const tree: ShallowWrapper = shallow(
      <StopWatch {...props} />
    );

    tree
      .find('button.stopwatch__startstop-button')
      .simulate('click');
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.START_STOPWATCH,
      payload: {
        key: 'testerid'
      }
    });
  });

  test('button click should reset stopwatch', () => {
    const tree: ShallowWrapper = shallow(
      <StopWatch {...props} />
    );

    tree
      .find('button.stopwatch__reset-button')
      .simulate('click');
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.RESET_STOPWATCH,
      payload: {
        key: 'testerid'
      }
    });
  });

  test('button click should remove stopwatch', () => {
    const tree: ShallowWrapper = shallow(
      <StopWatch {...props} />
    );

    tree
      .find('button.stopwatch__remove-button')
      .simulate('click');
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toBeCalledWith({
      type: ActionTypes.REMOVE_STOPWATCH,
      payload: {
        key: 'testerid'
      }
    });
  });
});