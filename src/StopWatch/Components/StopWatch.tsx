import React from 'react';
import { connect } from 'react-redux';
import { 
  IStopWatch, 
  actionCreators 
} from '../../StopWatchContainer/Store/StopWatchStateBundle';
import { IState } from '../../State/IState';
import { getStopWatch } from '../../StopWatchContainer/Store/Selectors';
import classNames from 'classnames';

interface IRawProps {
	dispatch(action: {}): void;
}

interface IStoreProps {
	stopWatch: IStopWatch | undefined;
}

interface IMapProps {
  className: string;
  id: string;
}

type IComponentProps = IRawProps & IStoreProps & IMapProps;

export const StopWatch: React.FC<IComponentProps> = (props): JSX.Element => {
  // Rendering check
  // console.log(`@@@ StopWatch.render id=${props.id}`);
  const { 
    dispatch,
    className,
    stopWatch,
    id
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

  const onClickStopStart = (): void => {
    running ? dispatch(actionCreators.stopWatch(id)) : dispatch(actionCreators.startWatch(id));
  }
  
  const onClickReset = (): void => {
    dispatch(actionCreators.resetWatch(id));
  }

  const onClickRemove = (): void => {
    dispatch(actionCreators.removeWatch(id));
  }
  
  const time: number = stopWatch !== undefined ? stopWatch.time : 0;
  const running: boolean = stopWatch !== undefined ? stopWatch.running : false; 
  const btnTitle: string = running ? 'STOP' : 'START';
  
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);
  const secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  
  const DEFAULT_CLASSNAME: string = 'stopwatch';
  const TIMER_CLASSNAME: string = `${DEFAULT_CLASSNAME}__timer`;
  const STARTSTOP_BUTTON_CLASSNAME: string = `${DEFAULT_CLASSNAME}__startstop-button`;
  const RESET_CLASSNAME: string = `${DEFAULT_CLASSNAME}__reset-button`;
  const REMOVE_CLASSNAME: string = `${DEFAULT_CLASSNAME}__remove-button`;
  
  const rootClasses: string = classNames(DEFAULT_CLASSNAME, className);
  
  const buttonStartStop = (): string => {
    return classNames(STARTSTOP_BUTTON_CLASSNAME, {
        [`${STARTSTOP_BUTTON_CLASSNAME}--start`]: !running,
        [`${STARTSTOP_BUTTON_CLASSNAME}--stop`]: running
    });
  }
  
  return (
    <div className={rootClasses}>
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
