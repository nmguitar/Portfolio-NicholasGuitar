//import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import { numPress, operPress, clearPress, equalPress, updateEquation, decPress, zeroPress } from './calculator-actions.js';
//import store from './store';

function multDivArr(arr, start, end){
  let product = arr[start];
  for(let i = start + 1; i < end; i = i+2){
    if(arr[i] === 'x'){
      product = product * arr[i+1];
    } else {
      product = product / arr[i+1];
    }
  }

  return product;
}

function sumArr(arr){
  let sum = Number(arr[0]);
  for(let i = 1; i < arr.length; i = i+2){
    if(arr[i] === '+'){
      sum = sum + Number(arr[i+1]);
    } else {
      sum = sum - Number(arr[i+1]);
    }
  }
  console.log('sumArr sum is: ' + sum);
  return sum;
}

function eqCheck(str){
  for(let i = 0; i < str.length; i++){
    if(str[i] == '='){
      console.log('equals found!')
      return true;
    }
  }
  console.log('NO equals found!')
  return false;
}

const clear = 'clear';

//when ready for redux change to calcApp
class calcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.allClear = this.allClear.bind(this);
    this.oneClick = this.oneClick.bind(this);
    this.twoClick = this.twoClick.bind(this);
    this.threeClick = this.threeClick.bind(this);
    this.fourClick = this.fourClick.bind(this);
    this.fiveClick = this.fiveClick.bind(this);
    this.sixClick = this.sixClick.bind(this);
    this.sevenClick = this.sevenClick.bind(this);
    this.eightClick = this.eightClick.bind(this);
    this.nineClick = this.nineClick.bind(this);
    this.zeroClick = this.zeroClick.bind(this);
    this.zeroClick = this.zeroClick.bind(this);
    this.decClick = this.decClick.bind(this);
    this.divideClick = this.divideClick.bind(this);
    this.multiplyClick = this.multiplyClick.bind(this);
    this.subtractClick = this.subtractClick.bind(this);
    this.addClick = this.addClick.bind(this);
    this.equalClick = this.equalClick.bind(this);
  }
  

  allClear(){
    this.props.clearPress(clear);
  }
  
  oneClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
      this.props.numberPress(1);
  }
  
  twoClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(2);
  }

  threeClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(3);
  }

  fourClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(4);
  }

  fiveClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(5);
  }

  sixClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(6);
  }
  
  sevenClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(7);
  }

  eightClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(8);
  }

  nineClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.numberPress(9);
  }

  zeroClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.zeroPress(0);
  }

  decClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      this.props.clearPress(clear);
    }
    this.props.decimalPress(".");
  }
  
  divideClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      let currentAnswer = this.props.rootReducer.inputDisplay;
      this.props.clearPress(clear);
      this.props.numberPress(currentAnswer);
    }
    this.props.operationPress("/");
  }

  multiplyClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      let currentAnswer = this.props.rootReducer.inputDisplay;
      this.props.clearPress(clear);
      this.props.numberPress(currentAnswer);
    }
    this.props.operationPress("x");
  }

  subtractClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      let currentAnswer = this.props.rootReducer.inputDisplay;
      this.props.clearPress(clear);
      this.props.numberPress(currentAnswer);
    }
    this.props.operationPress("-");
  }

  addClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      let currentAnswer = this.props.rootReducer.inputDisplay;
      this.props.clearPress(clear);
      this.props.numberPress(currentAnswer);
    }
    this.props.operationPress("+");
  }

  equalClick(){
    if(eqCheck(this.props.rootReducer.previousInputs) == true){
      //this.props.clearPress(clear);
    } else {
    let eqStr = this.props.rootReducer.previousInputs;
    let eqArr = [];
    let subStrStart = 0;
    //condition for trimming last character of eqStr if its an operator or decimal
    if(eqStr[eqStr.length - 1] === "+" || eqStr[eqStr.length - 1] === "-" || eqStr[eqStr.length - 1] === "x" || eqStr[eqStr.length - 1] === "/" || eqStr[eqStr.length - 1] === "."){
      eqStr = eqStr.slice(0, eqStr.length - 1);
    }
       
    for(let i = 0; i < eqStr.length; i++){
      if(eqStr[i] === "+" || eqStr[i] === "-" || eqStr[i] === "x" || eqStr[i] === "/"){
        eqArr.push(eqStr.slice(subStrStart, i));
        eqArr.push(eqStr[i]);
        subStrStart = i+1;
      }
    }
    eqArr.push(eqStr.slice(subStrStart, eqStr.length));
    //order of operations observed - find x and / operators and execute them first and generate a new array from that
    //no operators condition should be completed/checked first? just take number thats been put in and return "=" + number
    let equalsStr = "";
    
    if(eqArr.length === 1){
      equalsStr = eqArr[0];
    } else {
      let addSubArr = [];
      let prodSection = false;
      let prodStart = 0;
      let prodEnd = 0;
      for(let i = 0; i < eqArr.length; i++){
        //find the start and end of each product and push an arr slice of
        //that array section to the multDivProdArr
        if(eqArr[i] === "x" || eqArr[i] === "/"){
          if(prodSection == false){
            prodSection = true;
            prodStart = i - 1;
            console.log("hey prodStart is: " + prodStart);
          }
        }
        if(prodSection == true){
          if(eqArr[i] === "+" || eqArr[i] === "-"){
            prodEnd = i;
            console.log("hey prodEnd is: " + prodEnd);
            console.log(
              "product is: " + multDivArr(eqArr, prodStart, prodEnd));
            addSubArr.push(multDivArr(eqArr, prodStart, prodEnd));
            addSubArr.push(eqArr[i]);
            prodSection = false;
          } else if(i == eqArr.length - 1){
            prodEnd = i + 1;
            console.log("hey prodEnd is: " + prodEnd);
            console.log(
              "product is: " + multDivArr(eqArr, prodStart, prodEnd));
            addSubArr.push(multDivArr(eqArr, prodStart, prodEnd));
          }
        } else {
          if(eqArr[i] === '+' || eqArr[i] === '-'){
            addSubArr.push(eqArr[i-1]);
            addSubArr.push(eqArr[i]);
          } else if(i == eqArr.length - 1){
            addSubArr.push(eqArr[i]);              
          }
        }
      }
      //confirmed we are getting good array slices, should we just 
      console.log("hey addSubArr is: " + addSubArr);
      equalsStr = Math.round(sumArr(addSubArr) * 1e5)/1e5;
      
    }

    console.log('eqArr: ' + eqArr);
    console.log('equalsStr: ' + equalsStr)
    //equalsStr eventually
    this.props.equalPress(equalsStr);

    }
  }
  
  render() {
    //console.log(store.getState())

    return (

      <div id="calcContainer" >
        <div id="calculator">
          <div id="display">
            <div id="equationDisp" >
              {this.props.rootReducer.previousInputs}
            </div>
            <div id="inputDisp">
              {this.props.rootReducer.inputDisplay}
            </div>
          </div>
          <div id="allButtons" >
            <div className="row">
              <button className="col-6 wide" id="clear" value="AC"
               onClick={this.allClear} >AC</button>
              <button className="col-3" id="divide" value="/"
                onClick={this.divideClick}>/</button>
              <button className="col-3" id="multiply" value="x"
                onClick={this.multiplyClick}>x</button>
            </div>
            <div className="row">
              <button className="col-3" id="seven" value="7"
                onClick={this.sevenClick}>7</button>
              <button className="col-3" id="eight" value="8"
                onClick={this.eightClick}>8</button>
              <button className="col-3" id="nine" value="9"
                onClick={this.nineClick}>9</button>
              <button className="col-3" id="subtract" value="-"
                onClick={this.subtractClick}>-</button>
            </div>
            <div className="row">
              <button className="col-3" id="four" value="4"  
                onClick={this.fourClick}>4</button>
              <button className="col-3" id="five" value="5" 
                onClick={this.fiveClick}>5</button>
              <button className="col-3" id="six" value="6"
                onClick={this.sixClick}>6</button>
              <button className="col-3" id="add" value="+"
                onClick={this.addClick}>+</button>
            </div>
            <div className="row tallRow">
              <div className="row col-9">
                <div className="row">
                  <button className="col-4" id="one" value="1"
                    onClick={this.oneClick}>1</button>
                  <button className="col-4" id="two" value="2"
                    onClick={this.twoClick}>2</button>
                  <button className="col-4" id="three" value="3"
                    onClick={this.threeClick}>3</button>
                </div>
                <div className="row">
                  <button className="col-8" id="zero" value="0"
                    onClick={this.zeroClick}>0</button>
                  <button className="col-4" id="decimal" value="."
                    onClick={this.decClick}>.</button>
                </div>
              </div>
              <button className="col-3" id="equals" value="="
                onClick={this.equalClick}>=</button> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    rootReducer: {
      previousInputs: state.previousInputs,
      equationArray: state.equationArray,
      inputDisplay: state.inputDisplay
    }
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    numberPress: (number) => {
      dispatch(numPress(number));
    },
    operationPress: (operation) => {
      dispatch(operPress(operation));
    },
    clearPress: (clear) => {
      dispatch(clearPress(clear));
    },
    equalPress: (equals) => {
      dispatch(equalPress(equals));
    },
    decimalPress: (decimal) => {
      dispatch(decPress(decimal));
    },
    updateEquation: (update) => {
      dispatch(updateEquation(update));  
    },
    zeroPress: (zero) => {
      dispatch(zeroPress(zero));
    }
  }
}
const CalculatorApp = connect(mapStateToProps, mapDispatchToProps)(calcApp);

export default CalculatorApp


$(document).ready(function() {
  $("#appContainer").css("background-color", "hsl(240, 100%, 90%");

});