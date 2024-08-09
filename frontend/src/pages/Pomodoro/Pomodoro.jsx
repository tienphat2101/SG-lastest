import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <div
            id={this.props.lengthID}
            className={styles.lengthDisplay}
            onDoubleClick={this.props.onDoubleClick}
          >
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
      intervalID: null,
      alarmColor: { color: 'white' },
      warningActive: false,
      alertSound: '/sounds/notification.mp3',
      alertDuration: 6000,
      showPopup: false,
      alertDurationInput: 6, // Initial value for the alert duration input
      invalidTime: false, // Add invalidTime state to control error display
      isEditingBreak: false,
      isEditingSession: false,
      customBreakLength: 5,
      customSessionLength: 25,
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
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
        this.setState({ intervalID: null });
      }
      const buzzer = document.getElementById('beep');
      buzzer.pause();
      buzzer.currentTime = 0;
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
      }, this.state.alertDuration);
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
    buzzer.src = this.state.alertSound;
    buzzer.play();
    this.setState({ warningActive: true });
    setTimeout(() => {
      buzzer.pause();
      buzzer.currentTime = 0;
      this.setState({ warningActive: false });
    }, this.state.alertDuration);
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
      intervalID: null,
      alarmColor: { color: 'white' },
      warningActive: false,
      alertSound: '/sounds/notification.mp3',
      alertDuration: 6000,
      showPopup: false,
      invalidTime: false, // Reset invalid time state
      isEditingBreak: false,
      isEditingSession: false,
      customBreakLength: 5,
      customSessionLength: 25,
    });
    const buzzer = document.getElementById('beep');
    buzzer.pause();
    buzzer.currentTime = 0;
    clearInterval(this.state.intervalID);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'audio/mpeg' || file.type === 'audio/mp3') {
        const url = URL.createObjectURL(file);
        this.setState({ alertSound: url });
        toast.success('file upload successfully!', {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 3000
        });
      } else {
        toast.error('Please select an MP3 file.', {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 3000
        });
      }
    }
  }

  handleDurationChange() {
    const duration = parseInt(this.state.alertDurationInput, 10);
    if (duration >= 6 && duration <= 60) {
      this.setState({ 
        alertDuration: duration * 1000, 
        showPopup: false 
      });
      toast.success('Alert duration updated successfully!', {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 3000
      });
    } else {
      toast.error('Invalid time. Resetting to 6 seconds.', {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 3000
      });
      this.setState({ 
        alertDuration: 6000, 
        showPopup: false 
      });
    }
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  openPopup() {
    this.setState({ showPopup: true });
  }

  handleDoubleClick(e) {
    if (e.target.id === 'break-length') {
      this.setState({ isEditingBreak: true, customBreakLength: this.state.breakLength });
    } else if (e.target.id === 'session-length') {
      this.setState({ isEditingSession: true, customSessionLength: this.state.sessionLength });
    }
  }

  handleChange(e) {
    if (this.state.isEditingBreak) {
      this.setState({ customBreakLength: e.target.value });
    } else if (this.state.isEditingSession) {
      this.setState({ customSessionLength: e.target.value });
    }
  }

  handleBlur() {
    if (this.state.isEditingBreak) {
      const newBreakLength = parseInt(this.state.customBreakLength, 10);
      if (newBreakLength >= 1 && newBreakLength <= 60) {
        this.setState({ 
          breakLength: newBreakLength,
          timer: newBreakLength * 60,
          isEditingBreak: false 
        });
      } else {
        this.setState({ isEditingBreak: false });
      }
    } else if (this.state.isEditingSession) {
      const newSessionLength = parseInt(this.state.customSessionLength, 10);
      if (newSessionLength >= 1 && newSessionLength <= 60) {
        this.setState({ 
          sessionLength: newSessionLength,
          timer: newSessionLength * 60,
          isEditingSession: false 
        });
      } else {
        this.setState({ isEditingSession: false });
      }
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleBlur();
    }
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
            onDoubleClick={this.handleDoubleClick}
            length={this.state.isEditingBreak ? (
              <input 
                type="number"
                min="1"
                max="60"
                value={this.state.customBreakLength}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyPress}
                autoFocus
              />
            ) : (
              this.state.breakLength
            )}
          />
          <TimerLengthControl
            titleID="session-label"
            minID="session-decrement"
            addID="session-increment"
            lengthID="session-length"
            title="Session Length"
            onClick={this.setSessionLength}
            onDoubleClick={this.handleDoubleClick}
            length={this.state.isEditingSession ? (
              <input 
                type="number"
                min="1"
                max="60"
                value={this.state.customSessionLength}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyPress}
                autoFocus
              />
            ) : (
              this.state.sessionLength
            )}
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
        <div className={styles.customizeAlert}>
          <button onClick={() => document.querySelector('input[type=file]').click()}>
            Customize Alert
          </button>
          <input 
            type="file" 
            accept="audio/mp3" 
            onChange={this.handleFileChange} 
            style={{ display: 'none' }}
          />
          <button onClick={this.openPopup}>
            Alert Time
          </button>
        </div>
        {this.state.showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <span className={styles.close} onClick={this.closePopup}>&times;</span>
              <h2 className={styles.popupTitle}>Set a time between 6s and 60s</h2>
              <input 
                type="number" 
                min="6" 
                max="60" 
                value={this.state.alertDurationInput} 
                onChange={(e) => this.setState({ alertDurationInput: e.target.value })}
              />
              <button className={styles.popupButton} onClick={this.handleDurationChange}>
                Set Duration
              </button>
            </div>
          </div>
        )}
        <ToDoList />
        <audio id="beep" preload="auto" />
        <ToastContainer />
      </div>
    );
  }
}

export default Timer;
