import { 
    getStopWatchList,
    getStopWatch
} from './Selectors';
import {
    getState
} from '../../State/__mocks__/Store';
import {
    IState
} from '../../State/IState';
import uuidv1 from 'uuid/v1';

describe('selectors', () => {
    test('getStopWatchList selector returns correct state', () => {
        const key = uuidv1();
        const state = getState();
        const mockEmptyList: string[] = [];
        const update: IState = {
            stopWatchState: {
                stopWatches: {},
                stopWatchList: [key]
            }
        }

        const gotList = getStopWatchList(state);
        const gotFilledList = getStopWatchList(update);

        expect(gotList).toEqual(mockEmptyList);
        expect(gotFilledList).toEqual(update.stopWatchState.stopWatchList);
        expect(gotList.length).toBe(0);
        expect(gotFilledList.length).toBe(1);
    });

    test('getStopWatch selector returns correct state', () => {
        const id = uuidv1();
        const update: IState = {
            stopWatchState: {
                stopWatches: {
                    [id]: {
                        time: 0,
                        running: false,
                        key: id
                    }
                },
                stopWatchList: [id]
            }
        }
        const gotStopWatch = getStopWatch(id, update);

        if(gotStopWatch) {
            if(gotStopWatch.key) {
                expect(gotStopWatch.time).toBe(0);
                expect(gotStopWatch.running).toBe(false);
                expect(gotStopWatch.key).toBe(id);
            }
        }        
    });
});