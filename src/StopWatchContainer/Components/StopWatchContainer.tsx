import React from 'react';
import { connect } from 'react-redux';

import { IState } from '../../State/IState';
import { actionCreators } from '../Store/StopWatchStateBundle';
import { getStopWatchList } from '../Store/Selectors';
import StopWatch from '../../StopWatch/Components/StopWatch';

// No Typescript Definitions
const { Zoom } = require('react-reveal');

interface IRawProps {
	dispatch(action: {}): void;
}

interface IStoreProps {
	stopWatchList: string[];
}

type IComponentProps = IRawProps & IStoreProps;

// Defaults
const DEFAULT_CLASSNAME: string = 'stopwatches-container';
const HEADER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__header`;
const CONTROLS_CONTAINER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__controls-container`;
const AMOUNT_CLASSNAME: string = `${DEFAULT_CLASSNAME}__amount`;

// Button Container
const BUTTON_CONTAINER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__button-container`;
const ADD_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__add-button`;
const ADDX_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__addx-button`;
const REMOVE_BUTTON_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__removeall-button`;
const AMOUNT_INPUT_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__amount-input`;

// Dropdown Container
const DROPDOWN_CONTAINER_CLASSNAME: string = `${BUTTON_CONTAINER_CLASSNAME}__dropdown-container`;
const DROPDOWN_BUTTON_CLASSNAME: string = `${DROPDOWN_CONTAINER_CLASSNAME}__dropdown-button`;
const DROPDOWN_CONTENT_CLASSNAME: string = `${DROPDOWN_CONTAINER_CLASSNAME}__dropdown-content`;

// StopWatch Flex Container
const STOPWATCH_FLEXCONTAINER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__stopwatch-flexcontainer`;
const STOPWATCH_CLASSNAME: string = `${DEFAULT_CLASSNAME}__stopwatch`;

export function StopWatchContainer(props: IComponentProps): JSX.Element {
	const {
		dispatch,
		stopWatchList
	} = props;

	const [amount, setAmount] = React.useState('');
	const [visible, setVisible] = React.useState('All');

	function removeAllStopWatches(): void {
		dispatch(actionCreators.removeAllWatches());
	}

	function filterAllStopWatches(): void {
		setVisible('All');
	}

	function filterRunningStopWatches(): void {
		setVisible('Running');
	}

	function filterNotRunningStopWatches(): void {
		setVisible('Not Running');
	}

	function addStopWatch(): void {
		dispatch(actionCreators.addWatch());
	}

	function addXStopWatch (): void {
		dispatch(actionCreators.addXWatch(parseInt(amount)));
		setAmount('');
	}

	const watches: React.ReactElement[] = stopWatchList.map(k => {
		return (
			<Zoom key={k}>
				<StopWatch
					className={STOPWATCH_CLASSNAME}
					id={k}
					runningFilter={visible}
				/>
			</Zoom>
		);
	});

	// Reusable Components? Button Component?
	return (
		<div className={DEFAULT_CLASSNAME}>
			<h1 className={HEADER_CLASSNAME}>Stopwatch Mania</h1>
			<div className={CONTROLS_CONTAINER_CLASSNAME}>
				<p className={AMOUNT_CLASSNAME}>Stopwatch Amount: {stopWatchList.length}</p>
				<div className={BUTTON_CONTAINER_CLASSNAME}>
					<button className={ADD_BUTTON_CLASSNAME} onClick={addStopWatch}>ADD ONE</button>
					<button className={REMOVE_BUTTON_CLASSNAME} onClick={removeAllStopWatches}>REMOVE ALL</button>
					<div className={DROPDOWN_CONTAINER_CLASSNAME}>
						<button className={DROPDOWN_BUTTON_CLASSNAME}>{`Filter ${visible} ▼`}</button>
						<div className={DROPDOWN_CONTENT_CLASSNAME}>
							<span onClick={filterAllStopWatches}>All</span>
							<span onClick={filterRunningStopWatches}>Only Running</span>
							<span onClick={filterNotRunningStopWatches}>Only Not Running</span>
						</div>
					</div>
				</div>
				<div className={BUTTON_CONTAINER_CLASSNAME}>
					<input className={AMOUNT_INPUT_CLASSNAME} type='number' placeholder='Enter X Amount...' value={amount} onChange={e => setAmount(e.target.value)}></input>
					<button className={ADDX_BUTTON_CLASSNAME} onClick={addXStopWatch}>ADD X</button>
				</div>
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
