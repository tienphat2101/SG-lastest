import React from 'react';
import styles from './Pomodoro.module.css';
import ToDoList from './TodoList';

class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className={styles.lengthControl}>
        <div id={this.props.titleID}>{this.props.title}</div>
        <div className={styles.lengthWrapper}>
          <button
            id={this.props.minID}
            className={styles.btnLevel}
            value="-"
            onClick={this.props.onClick}
          >
            <i className="fa fa-minus"></i>
          </button>
          <div id={this.props.lengthID} className={styles.lengthDisplay}>
            {this.props.length}
          </div>
        </div>
        <button
          id={this.props.addID}
          className={styles.btnLevel}
          value="+"
          onClick={this.props.onClick}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' },
      warningActive: false
    };
    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }

  setBreakLength(e) {
    this.lengthControl('breakLength', e.currentTarget.value, this.state.breakLength, 'Break');
  }

  setSessionLength(e) {
    this.lengthControl('sessionLength', e.currentTarget.value, this.state.sessionLength, 'Session');
  }

  lengthControl(stateToChange, sign, currentLength, timerType) {
    this.setState((prevState) => {
      const newLength = sign === '+' ? currentLength + 1 : currentLength - 1;
      if (newLength > 0 && newLength < 61 && prevState.timerState === 'stopped') {
        if (prevState.timerType === timerType) {
          return { 
            [stateToChange]: newLength,
            timer: newLength * 60 
          };
        }
        return { [stateToChange]: newLength };
      } else {
        return null;
      }
    });
  }

  timerControl() {
    if (this.state.timerState === 'stopped') {
      this.beginCountDown();
      this.setState({ timerState: 'running' });
    } else {
      this.setState({ timerState: 'stopped' });
      if (this.state.intervalID) {
        clearInterval(this.state.intervalID);
        this.setState({ intervalID: '' });
      }
    }
  }
  
  beginCountDown() {
    this.setState({
      intervalID: setInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }

  decrementTimer() {
    this.setState((prevState) => ({
      timer: prevState.timer - 1
    }));
  }

  phaseControl() {
    if (this.state.timer === 0) {
      this.buzzer();
      setTimeout(() => {
        if (this.state.timerType === 'Session') {
          this.setState({
            timerType: 'Break',
            timer: this.state.breakLength * 60,
            alarmColor: { color: 'white' },
            warningActive: false
          });
        } else {
          this.setState({
            timerType: 'Session',
            timer: this.state.sessionLength * 60,
            alarmColor: { color: 'white' },
            warningActive: false
          });
        }
      }, 6000); // Delay switching timer type and resetting timer by 6 seconds
    } else {
      this.warning(this.state.timer);
    }
  }

  warning(timer) {
    if (timer < 61) {
      this.setState({ alarmColor: { color: 'red' } });
    } else {
      this.setState({ alarmColor: { color: 'white' } });
    }
  }

  buzzer() {
    const buzzer = document.getElementById('beep');
    buzzer.play();
    this.setState({ warningActive: true });
    setTimeout(() => {
      buzzer.pause();
      buzzer.currentTime = 0;
      this.setState({ warningActive: false });
    }, 6000); // Stop the buzzer after 6 seconds
  }

  switchTimer(num, str) {
    this.setState({
      timer: num * 60,
      timerType: str,
      alarmColor: { color: 'white' }
    });
  }

  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${minutes}:${seconds}`;
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' },
      warningActive: false
    });
    const buzzer = document.getElementById('beep');
    buzzer.pause();
    buzzer.currentTime = 0;
    clearInterval(this.state.intervalID);
  }

  render() {
    return (
      <div id={styles.container}>
        <div className={styles.mainTitle}>Pomodoro Clock</div>
        <div id={styles.controls}>
          <TimerLengthControl
            titleID="break-label"
            minID="break-decrement"
            addID="break-increment"
            lengthID="break-length"
            title="Break Length"
            onClick={this.setBreakLength}
            length={this.state.breakLength}
          />
          <TimerLengthControl
            titleID="session-label"
            minID="session-decrement"
            addID="session-increment"
            lengthID="session-length"
            title="Session Length"
            onClick={this.setSessionLength}
            length={this.state.sessionLength}
          />
        </div>
        <div className={styles.timer}>
          <div className={styles.timerWrapper} style={this.state.alarmColor}>
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.state.warningActive ? '00:00' : this.clockify()}</div>
          </div>
        </div>
        <div className={styles.timerControl}>
          <button id="start_stop" onClick={this.timerControl}>
            {this.state.timerState === 'stopped' ? (
              <i className="fa fa-play" />
            ) : (
              <i className="fa fa-pause" />
            )}
          </button>
          <button id="reset" onClick={this.reset}>
            <i className="fa fa-refresh" />
          </button>
        </div>
        <ToDoList />
        <audio id="beep" preload="auto" src="/sounds/notification.mp3" />
      </div>
    );
  }
}

export default Timer;
