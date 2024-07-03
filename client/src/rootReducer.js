import { combineReducers } from 'redux';
import { sessionLength, breakLength, timerMinutes, timerSeconds, playStatus, breakStatus } from './twenty-five/twenty-five-reducers'
import { previousInputs, inputDisplay } from './calculator/calculator-reducers'
import { displayComponent } from './App-reducers'

const rootReducer = combineReducers({
    //app.js reducer(s)
    displayComponent,
    //twentyfiveapp.jsx reducers
    sessionLength,
    breakLength,
    timerMinutes,
    timerSeconds,
    playStatus,
    breakStatus,
    //calculator.jsx reducers
    previousInputs,
    inputDisplay
  });
  
  export default rootReducer;