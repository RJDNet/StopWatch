import React from 'react';
import { Provider } from "react-redux";
import { 
    shallow, 
    ShallowWrapper 
} from 'enzyme';
import toJson from 'enzyme-to-json';

import { 
    store,
    getState 
} from '../../State/__mocks__/Store';
import { ActionTypes } from '../Store/StopWatchStateBundle';
import ConnectedStopWatchContainer, { 
    StopWatchContainer, 
    mapStateToProps 
} from './StopWatchContainer';

describe('StopWatchContainer Component', () => {
    const dispatch = jest.fn();
    const props = {
        dispatch,
        stopWatchList: []
    }

    test('StopWatch renders correctly with all props & no redux store', () => {        
        const tree: ShallowWrapper = shallow(
          <StopWatchContainer {...props} />
        );
          
        expect(toJson(tree)).toMatchSnapshot();
      });

    test('StopWatchContainer renders correctly with no props', () => {
        const component: ShallowWrapper = shallow(
            <Provider store={store}>
                <ConnectedStopWatchContainer />
            </Provider>
        );
      
        expect(toJson(component)).toMatchSnapshot();
    });

    test('mapStateToProps returns expected state', () => {
        const state = getState();
        const result = mapStateToProps(state);

        expect(result).toBeDefined();

        expect(result.stopWatchList).toEqual([]);
    });

    test('button click should add stopwatch', () => {
        const tree: ShallowWrapper = shallow(
            <StopWatchContainer {...props} />
        );
    
        tree
          .find('button.stopwatches-container__button-container__add-button')
          .simulate('click');
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toBeCalledWith({
                type: ActionTypes.ADD_STOPWATCH
            });
    });

    test('button click should add x stopwatches', () => {
        const tree: ShallowWrapper = shallow(
            <StopWatchContainer {...props} />
        );

        const testvalue: number = 5;
        tree.find('input').simulate('change', {target: {value: testvalue}});
        tree.update();
    
        tree
          .find('button.stopwatches-container__button-container__addx-button')
          .simulate('click');
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toBeCalledWith({
                type: ActionTypes.ADDX_STOPWATCH,
                payload: {
                    amount: testvalue
                }
            });
    });

    test('button click should remove all stopwatches', () => {
        const tree: ShallowWrapper = shallow(
            <StopWatchContainer {...props} />
        );
    
        tree
          .find('button.stopwatches-container__button-container__removeall-button')
          .simulate('click');
            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toBeCalledWith({
                type: ActionTypes.REMOVEALL_STOPWATCH
            });
    });
});