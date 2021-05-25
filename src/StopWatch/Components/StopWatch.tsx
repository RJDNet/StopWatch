import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { IState } from '../../State/IState';
import { 
  IStopWatch, 
  actionCreators 
} from '../../StopWatchContainer/Store/StopWatchStateBundle';
import { getStopWatch } from '../../StopWatchContainer/Store/Selectors';

interface IRawProps {
	dispatch(action: {}): void;
}

interface IStoreProps {
	stopWatch: IStopWatch | undefined;
}

interface IMapProps {
  className: string;
  id: string;
  runningFilter: string;
}

type IComponentProps = IRawProps & IStoreProps & IMapProps;

const DEFAULT_CLASSNAME: string = 'stopwatch';
const TIMER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__timer`;
const STARTSTOP_BUTTON_CLASSNAME: string = `${DEFAULT_CLASSNAME}__startstop-button`;
const RESET_CLASSNAME: string = `${DEFAULT_CLASSNAME}__reset-button`;
const REMOVE_CLASSNAME: string = `${DEFAULT_CLASSNAME}__remove-button`;

export function StopWatch(props: IComponentProps): JSX.Element {
  // Rendering check
  // console.log(`@@@ StopWatch.render id=${props.id}`);
  const { 
    dispatch,
    className,
    stopWatch,
    id,
    runningFilter
  } = props;

  React.useEffect(() => {
    const timer1 = setInterval(() => {
      if(stopWatch && stopWatch.running) {
        dispatch(actionCreators.tickWatch(id));
      }
    }, 1000);
    
    return () => {
      clearInterval(timer1);
    }
  }, [id, dispatch, stopWatch]);

  const time: number = stopWatch !== undefined ? stopWatch.time : 0;
  const running: boolean = stopWatch !== undefined ? stopWatch.running : false; 
  const btnTitle: string = running ? 'STOP' : 'START';

  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);
  const secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  
  function filterVisibility(): string {
    switch(runningFilter) {
      case 'All':
        return DEFAULT_CLASSNAME;
      case 'Running': 
        return classNames(DEFAULT_CLASSNAME, {
          [`${DEFAULT_CLASSNAME}--visible`]: running,
          [`${DEFAULT_CLASSNAME}--notvisible`]: !running
        });
      case 'Not Running': 
        return classNames(DEFAULT_CLASSNAME, {
          [`${DEFAULT_CLASSNAME}--visible`]: !running,
          [`${DEFAULT_CLASSNAME}--notvisible`]: running
        });
      default:
        return DEFAULT_CLASSNAME;
    }
  }
      
  function buttonStartStop(): string  {
    return classNames(STARTSTOP_BUTTON_CLASSNAME, {
        [`${STARTSTOP_BUTTON_CLASSNAME}--start`]: !running,
        [`${STARTSTOP_BUTTON_CLASSNAME}--stop`]: running
    });
  }

  const rootClasses: string = classNames(filterVisibility(), className);

  function onClickStopStart(): void {
    running ? dispatch(actionCreators.stopWatch(id)) : dispatch(actionCreators.startWatch(id));
  }
  
  function onClickReset(): void {
    dispatch(actionCreators.resetWatch(id));
  }

  function onClickRemove(): void {
    dispatch(actionCreators.removeWatch(id));
  }
  
  return (
    <div className={classNames(rootClasses)}>
      <p className={TIMER_CLASSNAME}>{minutes}:{secondsFormatted}</p>
      <button className={buttonStartStop()} onClick={onClickStopStart}>{btnTitle}</button>
      <button className={RESET_CLASSNAME} onClick={onClickReset}>RESET</button>
      <button className={REMOVE_CLASSNAME} onClick={onClickRemove}>REMOVE</button>
    </div>
  );
}

export function mapStateToProps(state: IState, ownProps: IMapProps): IStoreProps {
	const props: IStoreProps = {
		stopWatch: getStopWatch(ownProps.id, state)
	}

	return props;
}

export default connect<IStoreProps, {}, IMapProps, IState>(mapStateToProps)(StopWatch);
