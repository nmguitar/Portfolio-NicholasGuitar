import { GOCOMP } from './App-actions.js';

export const displayComponent = (state = 'home', action) =>{
  switch(action.type) {
    case GOCOMP:
      return action.component;
    //case RESETPRESS:
      //return 25;
    default:
      return state;
  }
}