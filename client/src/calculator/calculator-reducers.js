import { combineReducers } from 'redux';
import { NUMPRESS,OPERPRESS,CLEARPRESS,EQUALPRESS, UPDATE_EQUATION, DECPRESS, ZEROPRESS } from './calculator-actions.js';


export const previousInputs = (state = "", action) =>{
  switch(action.type) {
    case CLEARPRESS:
      return "";
    case NUMPRESS:
      if(state === "0" || state === 0){
        return action.number;
      }
      if(state[state.length - 1] === "0" || state[state.length - 1] === 0){
        if(state[state.length - 2] === "+" || 
           state[state.length - 2] === "-" || 
           state[state.length - 2] === "x" || 
           state[state.length - 2] === "/"){
          return state.slice(0, state.length - 1) + "" + action.number;
        }
      }
      return state + "" + action.number;
      
    case ZEROPRESS:
      if(state === "0" || state === 0){
        return state;
      }
      if(state[state.length - 1] === "0" || state[state.length - 1] === 0){
        if(state[state.length - 2] === "+" || 
           state[state.length - 2] === "-" || 
           state[state.length - 2] === "x" || 
           state[state.length - 2] === "/"){
          return state;
        }
      }
      return state + '' + action.zero;
      
    case OPERPRESS:
      if(state === ""){
        return state
      } else if(state[state.length - 1] === "+" || 
                state[state.length - 1] === "-" || 
                state[state.length - 1] === "x" || 
                state[state.length - 1] === "/") {
        return state.slice(0, state.length - 1) + "" + action.operation;
      } else if(action.operation === "x"){
        //if want to use dot for multiply goes here
        return state + "" + action.operation;
      } else if(state[state.length - 1] === "."){
        return state.slice(0, state.length - 1) + "" + action.operation;
      
      } else {
        return state + "" + action.operation;
      }
    case DECPRESS:
      if(state === "0" || state === 0 || state === "0." || state === ""){
        return "0."
      }
      for(let i = state.length - 1; i >= 0; i--){
        if(state[i] === "."){
          return state;
        } else if (state[i] === "+" || state[i] === "-" || state[i] === "x" || state[i] === "/"){
          if(state[i+1] === "0" || state[i+1] === 0){
            return state + "." 
          }else if(i == state.length-1) {
            return state + "0."
          } else {
            return state + "."
          }
        }
      }
      return state + "."
    case EQUALPRESS:
      if(state[state.length - 1] === "+" || 
         state[state.length - 1] === "-" || 
         state[state.length - 1] === "x" || 
         state[state.length - 1] === "/" || 
         state[state.length - 1] === "."){
        return state.slice(0, state.length - 1) + "=" + action.equals;
      } else {
        return state + "=" + action.equals;
      }
      
    default:
      return state;
  }
}

export const inputDisplay = (state = "", action) =>{
  switch(action.type) {
    case CLEARPRESS:
      return "0";
    case NUMPRESS:
      if(state == "0"){
        return action.number;
      } else if(
          state === "+" || 
          state === "-" || 
          state === "x" || 
          state === "/") {
        return action.number;
      } else {
        return state + "" + action.number;
      }
    case ZEROPRESS:
      if(state == "0"){
        return action.zero;
      } else if(
          state === "+" || 
          state === "-" || 
          state === "x" || 
          state === "/") {
        return action.zero;
      } else {
        return state + "" + action.zero;
      }
    case OPERPRESS:
      if(state === "0" || state === 0 || state === "0."){
        return state
      }else{
        return action.operation;
      }
    case DECPRESS:
      if(state === "0" || state === 0 || state === "0."){
        return "0."
      }
      for(let i = state.length - 1; i >= 0; i--){
        if(state[i] === "."){
          return state;
        } else if (state[i] === "+" || state[i] === "-" || state[i] === "x" || state[i] === "/"){
          i = 0;
          return "0."
        }
      }
      return state + "."
    case EQUALPRESS:
      return action.equals;
    default:
      return "0";
  }
}

export const equationArray = (state = [], action) =>{
  switch(action.type) {
    case CLEARPRESS:
      return [];
    /*case NUMPRESS:
      return [...state, action.number];*/
    default:
      return state;
  }
}
 


const rootReducer = combineReducers({
  previousInputs,
  inputDisplay
});

export default rootReducer;