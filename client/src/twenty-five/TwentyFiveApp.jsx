//import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faPlay, faPause, faRotate } from "@fortawesome/free-solid-svg-icons";
//import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import { sessChg, brkChg, playPause, resetPress, minuteChg, secondChg, brkSess  } from './twenty-five-actions.js';
//import store from '../store.js';

function twoDigStrDelta(str, dec){
  let tempNum = 0;
  if(str[0] === "0" && str !== "00"){
    tempNum = Number(str.slice(1)) - dec;
  } else {
    tempNum = Number(str) - dec;
  }

  if(String(tempNum).length < 2){
    //console.log("tempNum: " + tempNum);
    return "0" + tempNum;
  } else {
    //console.log("tempNum: " + tempNum);
    return "" + tempNum;
  }
}



class twoFiveFiveApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.breakDec = this.breakDec.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.playPause = this.playPause.bind(this);
    this.resetPress = this.resetPress.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }

  breakDec() {
    if(this.props.rootReducer.playStatus === "playing"){
    } else {
      let currentBreakLen = this.props.rootReducer.breakLength;
      if(currentBreakLen > 1){
        this.props.breakChange(currentBreakLen - 1);
        if(this.props.rootReducer.breakStatus === "Break"){
          let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.breakLength), 1)
          this.props.minuteChange(newMinStr);
          this.props.secondChange('00');
        }
      }
    }
  }

  breakInc() {
    if(this.props.rootReducer.playStatus === "playing"){
    } else {
      let currentBreakLen = this.props.rootReducer.breakLength;
      if(currentBreakLen < 60){
        this.props.breakChange(currentBreakLen + 1);
        if(this.props.rootReducer.breakStatus === "Break"){
          let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.breakLength), -1)
          this.props.minuteChange(newMinStr);
          this.props.secondChange('00');
        }
      }
    }
  }

  sessionDec() {
    if(this.props.rootReducer.playStatus === "playing"){
    } else {
      let currentSessionLen = this.props.rootReducer.sessionLength;
      if(currentSessionLen > 1){
        this.props.sessionChange(currentSessionLen - 1);
        if(this.props.rootReducer.breakStatus === "Session"){
          let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.sessionLength), 1)
          this.props.minuteChange(newMinStr);
          this.props.secondChange('00');
        }
      }
    }
  }
  
  sessionInc() {
    if(this.props.rootReducer.playStatus === "playing"){
    } else {
      let currentSessionLen = this.props.rootReducer.sessionLength;
      if(currentSessionLen < 60){
        this.props.sessionChange(currentSessionLen + 1);
        if(this.props.rootReducer.breakStatus === "Session"){
          let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.sessionLength), -1)
          this.props.minuteChange(newMinStr);
          this.props.secondChange('00');
        }
      }
      
    }
  }

  playPause() {
    if(this.props.rootReducer.playStatus === "paused"){
      this.props.playPause("playing");
    } else {
      this.props.playPause("paused");
    }
  }

  resetPress() {
    if(this.props.rootReducer.playStatus === "playing"){
      this.props.playPause("paused");
    }
    this.props.resetPress("reset")
  }

  playBeep(){
    let beepElement = document.getElementById("beep");
    beepElement.play();
  }
  //function twoDigStrDelta(str, dec) takes a number string w/ and w/out a leading zero
  //(eg: either 05 or 50), converts to a number, subtracts the value dec, then returns
  //as a two digit string (adding leading 0 as needed for eg: 05)
  componentDidUpdate(){
    console.log("componentDidUpdate!");
    setTimeout(() => {
      if(this.props.rootReducer.playStatus === "playing"){
        if(this.props.rootReducer.timerMinutes === "00" && this.props.rootReducer.timerSeconds === "00"){
          //play audio somewaysomehow when this time is hit
          this.playBeep();
          if(this.props.rootReducer.breakStatus === "Session"){
            let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.breakLength), 0)
            this.props.minuteChange(newMinStr);
            this.props.breakSessionFlip("Break");
          } else {
            let newMinStr = twoDigStrDelta(("" + this.props.rootReducer.sessionLength), 0)
            this.props.minuteChange(newMinStr);
            this.props.breakSessionFlip("Session");
          }
          
        } else {
          
            if(this.props.rootReducer.timerSeconds === "00") {
                let newMinStr = twoDigStrDelta(this.props.rootReducer.timerMinutes, 1);
                //console.log(newMinStr)
                this.props.minuteChange(newMinStr);
                this.props.secondChange("59");
              } else {
                let newSecStr = twoDigStrDelta(this.props.rootReducer.timerSeconds, 1);
                //console.log(newSecStr)
                this.props.secondChange(newSecStr);
              }
          
        }
      }
    }, 1000);
  }
  
  render() {
    //console.log("render state: ")
    //console.log(store.getState())
    
    return (
      <div id="twentyFiveContainer" >
        <div id="timerContainer" className="container-fluid">
          <h1 id="timerTitle" >25 + 5 Clock</h1>
          
          <div id="timerControls" className="row">
            <div id="breakControls" className="controlBox col-6">
              <h3 className="controlTitle" >Break Length</h3>
              <div className="controls" >
                <FontAwesomeIcon 
                  icon={faArrowDown} 
                  style={{border: 0, height: "20px", width: "20px"}} 
                  onClick={this.breakDec}></FontAwesomeIcon>
                <p>{this.props.rootReducer.breakLength}</p>              
                <FontAwesomeIcon 
                  icon={faArrowUp} 
                  style={{border: 0, height: "20px", width: "20px"}}
                  onClick={this.breakInc}></FontAwesomeIcon>
              </div>
            </div>
            <div id="sessionControls" className="controlBox col-6">
              <h3 className="controlTitle" >Session Length</h3>
              <div className="controls" >
                <FontAwesomeIcon 
                  icon={faArrowDown} 
                  style={{border: 0, height: "20px", width: "20px"}}
                  onClick={this.sessionDec}></FontAwesomeIcon>
                <p>{this.props.rootReducer.sessionLength}</p>              
                <FontAwesomeIcon 
                  icon={faArrowUp} 
                  style={{border: 0, height: "20px", width: "20px"}} 
                  onClick={this.sessionInc}></FontAwesomeIcon>
              </div>
            </div>
          </div>

          <div id="timerBox">
            <h4>{this.props.rootReducer.breakStatus}</h4>
            <div id="timerDisplay" >
              {this.props.rootReducer.timerMinutes}:{this.props.rootReducer.timerSeconds}
            </div>
          </div>

          <div id="playPauseReset">
            <div id="playPause" onClick={this.playPause}>
              <FontAwesomeIcon 
                icon={faPlay} 
                style={{marginRight: "-5px"}}
                ></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPause} ></FontAwesomeIcon>
            </div>
            <div id="reset" onClick={this.resetPress}>
              <FontAwesomeIcon icon={faRotate} ></FontAwesomeIcon>
            </div>
          </div>
          
        </div>
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    rootReducer: {
      sessionLength: state.sessionLength,
      breakLength: state.breakLength,
      timerMinutes: state.timerMinutes,
      timerSeconds: state.timerSeconds,
      playStatus: state.playStatus,
      breakStatus: state.breakStatus
    }
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    breakChange: (number) => {
      dispatch(brkChg(number));
    },
    sessionChange: (number) => {
      dispatch(sessChg(number));
    },
    playPause: (status) => {
      dispatch(playPause(status));
    },
    resetPress: (value) => {
      dispatch(resetPress(value));
    },
    minuteChange: (numStr) => {
      dispatch(minuteChg (numStr));
    },
    secondChange: (numStr) => {
      dispatch(secondChg(numStr));
    },
    breakSessionFlip: (status) => {
      dispatch(brkSess(status));
    }
  }
}
const TwentyFiveApp = connect(mapStateToProps, mapDispatchToProps)(twoFiveFiveApp);

export default TwentyFiveApp