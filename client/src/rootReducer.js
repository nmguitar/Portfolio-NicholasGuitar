import { combineReducers } from 'redux';
import { sessionLength, breakLength, timerMinutes, timerSeconds, playStatus, breakStatus } from './twenty-five/twenty-five-reducers'

const rootReducer = combineReducers({
    sessionLength,
    breakLength,
    timerMinutes,
    timerSeconds,
    playStatus,
    breakStatus
  });
  
  export default rootReducer;