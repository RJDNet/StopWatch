import React from 'react';
import { Provider } from "react-redux";
import { 
  shallow, 
  ShallowWrapper 
} from 'enzyme';
import toJson from 'enzyme-to-json';
import { v1 as uuidv1 } from 'uuid';

import { 
  store, 
  getState 
} from '../../State/__mocks__/Store';
import { IState } from '../../State/IState';
import { ActionTypes } from '../../StopWatchContainer/Store/StopWatchStateBundle';
import ConnectedStopWatch, { 
  StopWatch, 
  mapStateToProps,
  IStopWatchProps, 
  IMapProps
} from './StopWatch';

describe('StopWatch Component', () => {
  const dispatch = jest.fn();
  const key: string = uuidv1();

  const props: IStopWatchProps = {
    className: 'stopwatch',
    id: 'testerid',
    runningFilter: 'All',
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

  test('StopWatch renders correctly with className, id * runningFilter props with redux store', () => {
    const tree: ShallowWrapper = shallow(
      <Provider store={store}>
        <ConnectedStopWatch className={'stopwatch'} id={'testerid'} runningFilter={'All'} />
      </Provider>
    );
      
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('mapStateToProps returns expected state', () => {
    const stopWatchState = getState();
    const state: IState = {
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
        stopWatchList: ['testid'],
        filteredList: []
      }
    }
    
    const own: IMapProps = {
      className: 'stopwatch',
      id: 'testid',
      runningFilter: 'All'
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