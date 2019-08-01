import React from 'react';
import { connect } from 'react-redux';
import StopWatch from '../../StopWatch/Components/StopWatch';
import { actionCreators } from '../Store/StopWatchStateBundle';
import { IState } from '../../State/IState';
import { getStopWatchList } from '../Store/Selectors';

interface IRawProps {
	dispatch(action: {}): any;
}

interface IStoreProps {
	stopWatchList: string[];
}

type IComponentProps = IRawProps & IStoreProps;

export const StopWatchContainer: React.FC<IComponentProps> = (props): JSX.Element => {
	const {
		dispatch,
		stopWatchList
	} = props;

	const [amount, setAmount] = React.useState('');

	const DEFAULT_CLASSNAME: string = 'stopwatches-container';
	const HEADER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__header`;
	const COUNTER_HEADER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__counter-header`;
	const COUNTER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__counter`;
	const BUTTON_CONTAINER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__button-container`;
	const BUTTON_CONTAINER_ADD_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__add-button`;
	const BUTTON_CONTAINER_ADDX_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__addx-button`;
	const BUTTON_CONTAINER_REMOVE_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__removeall-button`;
	const BUTTON_CONTAINER_AMOUNT_INPUT_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__amount-input`;
	const STOPWATCH_FLEXCONTAINER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__stopwatch-flexcontainer`;
	const STOPWATCH_CLASSNAME: string = `${DEFAULT_CLASSNAME}__stopwatch`;
	
	const watches: React.ReactElement[] = stopWatchList.map((k) => {		
		return (
			<StopWatch
				className={STOPWATCH_CLASSNAME} 
				key={k}
				id={k}
			/>
		);
	});

	const addStopWatch = (): void => {
		dispatch(actionCreators.addWatch());
	}

	const addXStopWatch = (): void => {
		dispatch(actionCreators.addXWatch(parseInt(amount)));
		setAmount('');
	}

	const removeAllStopWatches = (): void => {
		dispatch(actionCreators.removeAllWatches());
	}

	return (
		<div className={DEFAULT_CLASSNAME}>
			<h1 className={HEADER_CLASSNAME}>Stopwatch App</h1>
			<p className={COUNTER_HEADER_CLASSNAME}>Stopwatch Count</p>
			<p className={COUNTER_CLASSNAME}>{stopWatchList.length}</p>
			<div className={BUTTON_CONTAINER_CLASSNAME}>
				<button className={BUTTON_CONTAINER_ADD_BUTTON_CLASSNAME} onClick={addStopWatch}>ADD ONE</button>
				<button className={BUTTON_CONTAINER_REMOVE_BUTTON_CLASSNAME} onClick={removeAllStopWatches}>REMOVE ALL</button>
			</div>
			<div className={BUTTON_CONTAINER_CLASSNAME}>
				<input className={BUTTON_CONTAINER_AMOUNT_INPUT_CLASSNAME} type='number' placeholder='Enter Amount...' value={amount} onChange={e => setAmount(e.target.value)}></input>
				<button className={BUTTON_CONTAINER_ADDX_BUTTON_CLASSNAME} onClick={addXStopWatch}>ADD X</button>
			</div>
			<div className={STOPWATCH_FLEXCONTAINER_CLASSNAME}>
				{
					watches
				}
			</div>
		</div>
	);
}

export function mapStateToProps(state: IState): IStoreProps {
	const props: IStoreProps = {
		stopWatchList: getStopWatchList(state)
	}

	return props;
}	
	
export default connect<IStoreProps, {}, {}, IState>(mapStateToProps)(StopWatchContainer);
