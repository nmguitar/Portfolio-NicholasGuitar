//import { combineReducers } from 'redux';
import { SESSCHG, BRKCHG, PLAYPAUSE, RESETPRESS, MINUTECHG, SECONDCHG, BRKSESS } from './twenty-five-actions.js';

export const sessionLength = (state = 25, action) =>{
  switch(action.type) {
    case SESSCHG:
      return action.number;
    case RESETPRESS:
      return 25;
    default:
      return state;
  }
}

export const breakLength = (state = 5, action) =>{
  switch(action.type) {
    case BRKCHG:
      return action.number;
    case RESETPRESS:
      return 5;
    default:
      return state;
  }
}

export const timerMinutes = (state = "25", action) => {
  switch(action.type) {
    case MINUTECHG:
      return action.numStr;
    case RESETPRESS:
      return "25";
    default:
      return state;
  }
}

export const timerSeconds = (state = "00", action) => {
  switch(action.type) {
    case SECONDCHG:
      return action.numStr
    case RESETPRESS:
      return "00";
    default:
      return state;
  }
}

export const playStatus = (state = "paused", action) => {
  switch(action.type) {
    case PLAYPAUSE:
      return action.status;      
    default:
      return state;
  }
}

export const breakStatus = (state = "Session", action) => {
  switch(action.type) {
    case BRKSESS:
      return action.status;
    case RESETPRESS:
      return "Session";
    default:
      return state;
  }
}
/*
const rootReducer = combineReducers({
  sessionLength,
  breakLength,
  timerMinutes,
  timerSeconds,
  playStatus,
  breakStatus
});

export default rootReducer;
*/